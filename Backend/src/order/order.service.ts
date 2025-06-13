import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from 'src/cart/cart.service';
import { Order } from 'src/models/Order.entity';
import { OrderItem } from 'src/models/OrderItem.entity';
import { User } from 'src/models/User.entity';
import { Product } from 'src/models/Product.entity';
import { Cart } from 'src/models/Cart.entity';
import { MailService } from 'src/mail/mail.service';
import { validateCreateOrder } from './order.validator';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    private cartService: CartService,
    private mailService: MailService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const errors = validateCreateOrder(createOrderDto);
    if (errors) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
    const {
      userId,
      address,
      phone,
      firstName,
      lastName,
      email,
      isSubscribingToNewsletter,
    } = createOrderDto;

    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      user.firstName = firstName;
      user.lastName = lastName;
      user.city = address.city;
      user.postalCode = address.zip;
      user.address = address.addressLine1;
      user.country = address.country;
      user.state = address.state;
      user.phone = phone;
      user.email = email;

      await this.userRepository.save(user);

      const order = this.orderRepository.create({
        user: user,
        totalAmount: 0,
        status: 'pending',
      });
      await this.orderRepository.save(order);

      if (isSubscribingToNewsletter) {
        this.mailService.subscribe({ email });
      }
      const cart = await this.cartService.getCart(user.id);
      if (!cart || !cart.items || cart.items.length === 0) {
        return new HttpException('Cart is empty', HttpStatus.NOT_FOUND);
      }

      const orderItems = [];

      for (const item of cart.items) {
        const priceItem = item.product.price * item.quantity;

        const orderItem = this.orderItemRepository.create({
          product: item.product,
          quantity: item.quantity,
          attributes: item.attributes,
          price: priceItem,
          order: order,
        });

        await this.orderItemRepository.save(orderItem);
        orderItems.push(orderItem);
      }

      order.totalAmount = cart.subtotalPrice + 10;
      order.items = orderItems;
      await this.orderRepository.save(order);

      await this.cartService.clearCart(user.id);
      const orderDetailsHtml = this.generateOrderConfirmationEmail(order, cart);
      await this.mailService.sendEmail(
        email,
        'Thank you for your order!',
        orderDetailsHtml,
      );
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      return new HttpException(
        'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const orders = await this.orderRepository.find();
    if (!orders) {
      throw new HttpException('Orders not found', HttpStatus.NOT_FOUND);
    }
    return orders;
  }

  async findAllUserOrders(userId: string) {
    const orders = await this.orderRepository.find({
      where: { user: { id: userId } },
    });
    if (!orders) {
      throw new HttpException('Orders not found', HttpStatus.NOT_FOUND);
    }
    return orders;
  }

  async getOrder(userID: string, orderId: string) {
    const order = this.orderRepository.findOne({
      where: { id: orderId, user: { id: userID } },
    });
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const {
      userId,
      // city,
      // postalCode,
      // address,
      // country,
      // phone,
      // firstName,
      // lastName,
      // email,
      orderId,
    } = updateOrderDto;
    const user = this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const order = this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      return new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    // order.user = user.id;
    return `This action updates a #${id} order`;
  }

  async removeOrder(userId: string, orderId: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: { user: { id: userId }, id: orderId },
      });
      if (!order) {
        return new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return this.orderRepository.remove(order);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeAllUserOrders(userId: string) {
    try {
      const orders = await this.orderRepository.find({
        where: { user: { id: userId } },
      });
      if (!orders) {
        return new HttpException('Orders not found', HttpStatus.NOT_FOUND);
      }
      return this.orderRepository.remove(orders);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeAllOrders() {
    const orders = await this.orderRepository.find();
    if (!orders) {
      return new HttpException('Orders not found', HttpStatus.NOT_FOUND);
    }

    return this.orderRepository.remove(orders);
  }
  private generateOrderConfirmationEmail(order: Order, cart: Cart): string {
    const itemsHtml = cart.items
      .map(
        (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">
        <a href="${process.env.PUBLIC_SERVER}product/${item.product.id}" 
           style="color: #0066cc; text-decoration: underline;">
          ${item.product.name}
        </a>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
        $${(item.product.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `,
      )
      .join('');

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Thank you for your order, ${order.user.firstName}!</h2>
      <p>We're excited to let you know we've received your order ${order.id} and it's being processed.</p>
      
      <h3 style="margin-top: 20px; color: #333;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd;">Item</th>
            <th style="text-align: center; padding: 10px; border-bottom: 2px solid #ddd;">Qty</th>
            <th style="text-align: right; padding: 10px; border-bottom: 2px solid #ddd;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr>
            <td colspan="2" style="text-align: right; padding: 10px; font-weight: bold;">Total:</td>
            <td style="text-align: right; padding: 10px; font-weight: bold;">$${cart.subtotalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      
      <h3 style="margin-top: 20px; color: #333;">Shipping Information</h3>
      <p>
        ${order.user.firstName} ${order.user.lastName}<br>
        ${order.user.address}<br>
        ${order.user.city}, ${order.user.postalCode}<br>
        ${order.user.country}<br>
        Phone: ${order.user.phone}
      </p>
      
      <p>If you have any questions, please reply to this email or contact our support team.</p>
      
      <p style="margin-top: 30px;">
        Thanks again for shopping with us!<br>
        <strong>The ${process.env.STORE_NAME} Team</strong>
      </p>
    </div>
  `;
  }
}
