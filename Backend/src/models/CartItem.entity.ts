import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cart } from './Cart.entity';
import { Product } from './Product.entity';
import { Exclude } from 'class-transformer';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @Exclude()
  cart: Cart;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column({ default: 1 })
  quantity: number;

  @Column({ type: 'jsonb', nullable: true })
  attributes: Array<Record<string, string>> | null;
}
