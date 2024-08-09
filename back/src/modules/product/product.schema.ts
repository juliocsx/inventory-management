import { DataTypes } from 'sequelize';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProductType } from '../productType/productType.schema';

@Table({ tableName: 'product', paranoid: true })
export class Product extends Model<Product> {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataTypes.DATEONLY,
    allowNull: false,
  })
  expiration_date: Date;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  quantity: number;
  
  @ForeignKey(() => ProductType)
  'product_type_id': string;
  @BelongsTo(() => ProductType)
  productType: ProductType;
}
