import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './Order.entity';
import { Product } from './Product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'json', nullable: true })
  attributes: Array<Record<string, string>>;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
