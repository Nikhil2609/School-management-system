import { CategoryModal } from './category.modal';
import { ProductModal } from './products.modal';

export function setupAssociations() {
  ProductModal.belongsTo(CategoryModal, {
    foreignKey: 'category_id',
    as: 'category'
  });

  CategoryModal.hasMany(ProductModal, {
    foreignKey: 'category_id',
    as: 'products'
  });
}
