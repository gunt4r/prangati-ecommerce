export class CreateCartDto {
  userId: string;
  productId: string;
  quantity: number;
  shouldIncrement?: boolean;
  attributes?: Array<{
    color?: string;
    size?: string;
  }>;
  subtotalPrice?: number;
}
