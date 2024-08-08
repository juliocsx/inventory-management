import { DataTypes } from 'sequelize';
import {
  BeforeCreate,
  Column,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'productType', paranoid: true })
export class ProductType extends Model<ProductType> {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  describe: string;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  price: number;
}
