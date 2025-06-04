import CategoryRepository from '../repository/catagory.repository';

export default class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  getCategories = async (offsetRows: number) => {
    const categories = await this.categoryRepository.getCategories(offsetRows);
    return categories;
  };

  getCategoryById = async (categoryId: string) => {
    const category = await this.categoryRepository.getCategoryById(categoryId);
    return category;
  };

  createCategory = async (categoryData: any) => {
    const newCategory = await this.categoryRepository.createCategory(categoryData);
    return newCategory;
  };

  updateCategory = async (categoryId: string, categoryData: any) => {
    const updatedCategory = await this.categoryRepository.updateCategory(categoryId, categoryData);
    return updatedCategory;
  };

  deleteCategory = async (categoryId: string) => {
    const deletedCategory = await this.categoryRepository.deleteCategory(categoryId);
    return deletedCategory;
  };

  getProductsByCategory = async (categoryId: string) => {
    const products = await this.categoryRepository.getProductsByCategory(categoryId);
    return products;
  };
}
