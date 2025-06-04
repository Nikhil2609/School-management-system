import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class CategoryModal extends Model {
  declare id: number;
  declare name: string;
  declare descrption: string;
}

CategoryModal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
    tableName: 'category',
    timestamps: false
  }
);
