import { PartialType } from '@nestjs/mapped-types';
import { CreateProductTypeDto } from './create-productType.dto';

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {}
