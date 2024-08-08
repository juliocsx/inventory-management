import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateProductDto {
  @IsDateString()
  @IsNotEmpty()
  readonly expiration_date: Date;

  @IsString()
  @IsNotEmpty()
  readonly product_type_id: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
}
