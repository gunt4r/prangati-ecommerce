import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/models/Cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/models/Product.entity';
import { User } from 'src/models/User.entity';
import { CartItem } from 'src/models/CartItem.entity';

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
      relations: ['product'],
    });
    return { ...cart, items };
  }
  async addProductToCart(createCartDto: CreateCartDto) {
    const { userId, productId, quantity } = createCartDto;
    try {
      let cart = await this.getCart(userId);
      if (!cart) {
        cart = await this.createCart(userId);
      }

      const product = await this.productRepository.findOne({
        where: { id: productId },
      });
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (quantity <= 0) {
        throw new HttpException(
          'Quantity must be greater than 0',
          HttpStatus.BAD_REQUEST,
        );
      }
      const existingItem = cart.items.find(
        (item) => item.product?.id === product.id,
      );
      if (existingItem) {
        existingItem.quantity += quantity;
        await this.cartItemRepository.save(existingItem);
        return this.cartRepository.save(cart);
      } else {
        const cartItem = this.cartItemRepository.create({
          cart: cart,
          product: product,
          quantity: quantity,
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
        return new Error('User not found');
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
        return new Error('Product not found');
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
        return this.cartRepository.save(cart);
      } else {
        if (quantity < 0) {
          return this.removeItemFromCart(userId, productId);
        }
        return this.addProductToCart({ userId, productId, quantity });
      }
    } catch (error) {
      throw new Error(error);
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

  async removeItemsCart(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const cart = await this.cartRepository.findOne({
      where: { user: { id: user.id } },
    });
    if (!cart) {
      return new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    await this.cartItemRepository.delete({ cart: { id: cart.id } });
    return this.cartRepository.save(cart);
  }
  async removeAll() {
    await this.cartRepository.query(`TRUNCATE carts RESTART IDENTITY CASCADE;`);
    return 'Carts were deleted';
  }
}
