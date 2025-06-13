import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('newsletter')
export class Newsletter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  subscribedAt: Date;
}
