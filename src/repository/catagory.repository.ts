import { CategoryModal } from '../models/category.modal';
import { ProductModal } from '../models/products.modal';
import { PerPageRows } from '../utils/constant';

export default class CategoryRepository {
  constructor() {}

  getCategories = async (offsetRows: number) => {
    return await CategoryModal.findAndCountAll({
      offset: offsetRows,
      limit: PerPageRows
    });
  };

  getCategoryById = async (categoryId: string) => {
    return await CategoryModal.findOne({ where: { id: categoryId } });
  };

  createCategory = async (categoryData: any) => {
    return await CategoryModal.create(categoryData);
  };

  updateCategory = async (categoryId: string, categoryData: any) => {
    const category = await CategoryModal.findOne({ where: { id: categoryId } });
    if (!category) {
      return null;
    }
    await category.update(categoryData);
    return category;
  };

  deleteCategory = async (categoryId: string) => {
    const category = await CategoryModal.findOne({ where: { id: categoryId } });
    if (!category) {
      return null;
    }
    await category.destroy();
    return category;
  };

  getProductsByCategory = async (categoryId: string) => {
    const products = await ProductModal.findAll({
      where: { category_id: categoryId }
    });
    return products;
  };
}
