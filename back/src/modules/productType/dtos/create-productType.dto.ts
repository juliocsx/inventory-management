import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  @IsNotEmpty()
  readonly describe: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
