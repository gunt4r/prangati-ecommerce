import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('viewed_products')
export class ViewedProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userUuid: string;

  @Column()
  productId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  viewedAt: Date;
}
