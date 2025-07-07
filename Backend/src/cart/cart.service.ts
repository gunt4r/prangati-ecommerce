import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from 'src/models/Cart.entity';
import { Product } from 'src/models/Product.entity';
import { User } from 'src/models/User.entity';
import { CartItem } from 'src/models/CartItem.entity';
import { UploadImagesService } from 'src/upload-images/upload-images.service';
import { WishlistService } from 'src/wishlist/wishlist.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly uploadImagesService: UploadImagesService,
    private readonly wishlistService: WishlistService,
  ) {}
  async createCart(userId: string) {
    const existingCart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });
    if (existingCart) {
      return existingCart;
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const cart = this.cartRepository.create({
      user: user,
      items: [],
    });
    return await this.cartRepository.save(cart);
  }

  async getCart(userID: string) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userID } },
    });
    if (!cart) {
      throw new Error('Cart not found');
    }
    const items = await this.cartItemRepository.find({
      where: { cart: { id: cart.id } },
      relations: ['product', 'product.category', 'product.images'],
    });
    const subtotalPrice = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
    cart.subtotalPrice = subtotalPrice;
    await this.cartRepository.save(cart);
    return { ...cart, items };
  }
  async addProductToCart(createCartDto: CreateCartDto) {
    const {
      userId,
      productId,
      quantity,
      shouldIncrement = true,
      attributes,
    } = createCartDto;
    try {
      let cart = await this.getCart(userId);
      if (!cart) {
        cart = await this.createCart(userId);
      }
      console.log('cart:', cart);
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (quantity <= 0) {
        throw new HttpException(
          'Quantity must be greater than 0',
          HttpStatus.BAD_REQUEST,
        );
      }
      const existingItem = cart.items.find((item) => {
        if (item.product.id !== product.id) return false;
        return true;
      });

      if (existingItem) {
        existingItem.attributes.push(...attributes);
        existingItem.quantity = shouldIncrement
          ? existingItem.quantity + quantity
          : quantity;
        if (attributes?.length) {
          const existingAttrSet = new Set(
            existingItem.attributes.map((attr) => JSON.stringify(attr)),
          );
          const newAttributes = attributes.filter(
            (attr) => !existingAttrSet.has(JSON.stringify(attr)),
          );
          existingItem.attributes.push(...newAttributes);
        }
        await this.cartItemRepository.save(existingItem);
      } else {
        const cartItem = this.cartItemRepository.create({
          cart: cart,
          product: product,
          quantity: quantity,
          attributes: attributes,
        });
        await this.cartItemRepository.save(cartItem);
        cart.items.push(cartItem);
      }
      return this.cartRepository.save(cart);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error adding product to cart: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCartItem(updateCartDto: UpdateCartDto) {
    const { userId, productId, quantity } = updateCartDto;
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      let cart = await this.cartRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['items', 'items.product'],
      });
      if (!cart) {
        cart = await this.createCart(userId);
      }

      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      if (quantity <= 0) {
        return this.removeItemFromCart(userId, productId);
      }
      const existingItem = cart.items.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        if (existingItem.quantity < 0) {
          return this.removeItemFromCart(userId, productId);
        }
        existingItem.quantity = quantity;
        await this.cartItemRepository.save(existingItem);
        return this.getCart(userId);
      } else {
        if (quantity < 0) {
          return this.removeItemFromCart(userId, productId);
        }
        return this.addProductToCart({ userId, productId, quantity });
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException(
        `Error updating cart item: ${error.message}`,
      );
    }
  }

  async removeItemFromCart(userId: string, productId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return new Error('User not found');
    }
    let cart = await this.cartRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!cart) {
      cart = await this.createCart(userId);
    }
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      return new Error('Product not found');
    }
    const cartItem = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: product.id } },
    });
    if (!cartItem) {
      return new Error('Cart item not found');
    }
    await this.cartItemRepository.remove(cartItem);
    return this.cartRepository.save(cart);
  }

  async clearCart(userId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const cart = await this.cartRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['items', 'items.product'],
      });
      console.log('cart', cart);
      if (!cart) {
        throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
      }
      if (!cart.items || cart.items.length === 0) {
        return cart;
      }
      if (cart.items && cart.items.length > 0) {
        await this.cartItemRepository.delete({ cart: { id: cart.id } });
        cart.items = [];
        cart.subtotalPrice = 0;
        await this.cartRepository.save(cart);
      }
      return cart;
    } catch (error) {
      throw new HttpException(
        error instanceof HttpException
          ? error.getResponse()
          : `Error clearing cart: ${error.message}`,
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async removeAndAddToWishlist(userID: string, productID: string) {
    const user = await this.userRepository.findOne({ where: { id: userID } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isAddedToWishlist = await this.wishlistService.findOne({
      userID,
      productID,
    });
    if (isAddedToWishlist.status == HttpStatus.OK)
      throw new HttpException(
        'Product already in wishlist',
        HttpStatus.CONFLICT,
      );
    try {
      this.removeItemFromCart(userID, productID);
      await this.wishlistService.create({ userID, productID });
      return {
        message: 'Product removed from cart and added to wishlist',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async removeAll() {
    await this.cartRepository.query(`TRUNCATE carts RESTART IDENTITY CASCADE;`);
    return 'Carts were deleted';
  }
}
