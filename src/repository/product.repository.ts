import { CategoryModal } from '../models/category.modal';
import { ProductModal } from '../models/products.modal';
import { PerPageRows } from '../utils/constant';

export default class ProductRepository {
  constructor() {}

  getCategories = async (offsetRows: number) => {
    return await ProductModal.findAndCountAll({
      include: { model: CategoryModal, as: 'category' },
      offset: offsetRows,
      limit: PerPageRows
    });
  };

  getProductById = async (productId: string) => {
    return await ProductModal.findOne({ where: { id: productId } });
  };

  createProduct = async (productData: Partial<ProductModal>) => {
    return await ProductModal.create(productData);
  };

  updateProduct = async (productId: string, productData: ProductModal) => {
    const product = await ProductModal.findOne({ where: { id: productId } });
    if (!product) {
      return null;
    }
    await product.update(productData);
    return product;
  };

  deleteProduct = async (productId: string) => {
    const product = await ProductModal.findOne({ where: { id: productId } });
    if (!product) {
      return null;
    }
    await product.destroy();
    return product;
  };
}
