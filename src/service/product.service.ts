import { ProductModal } from '../models/products.modal';
import ProductRepository from '../repository/product.repository';

export default class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  getProducts = async (offsetRows: number) => {
    const categories = await this.productRepository.getCategories(offsetRows);
    return categories;
  };

  getProductById = async (productId: string) => {
    const product = await this.productRepository.getProductById(productId);
    return product;
  };

  createProduct = async (productData: ProductModal) => {
    const newProduct = await this.productRepository.createProduct(productData);
    return newProduct;
  };

  updateProduct = async (productId: string, productData: any) => {
    const updatedProduct = await this.productRepository.updateProduct(productId, productData);
    return updatedProduct;
  };

  deleteProduct = async (productId: string) => {
    const deletedProduct = await this.productRepository.deleteProduct(productId);
    return deletedProduct;
  };
}
