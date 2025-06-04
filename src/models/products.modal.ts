import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { CategoryModal } from './category.modal';

export class ProductModal extends Model {
  declare id: number;
  declare name: string;
  declare quantity: number;
  declare price: number;
  declare description: string;
  declare category_id: number;
}

ProductModal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: sequelize,
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at', // map createdAt (modal name) to created_at (table column name)
    updatedAt: 'updated_at'
  }
);

// association
// ProductModal.belongsTo(CategoryModal, {
//   foreignKey: 'category_id',
//   as: 'category'
// });
// CategoryModal.hasMany(ProductModal, {
//   foreignKey: 'category_id',
//   as: 'products'
// });
