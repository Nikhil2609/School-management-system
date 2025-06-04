import express from 'express';
import CategoryRepository from '../repository/catagory.repository';
import CategoryService from '../service/catagory.service';
import CategoryController from '../controller/catagory.controller';
import { categorySchema } from '../utils/validations';
import { celebrate } from 'celebrate';

const categoryRouter = express.Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

categoryRouter.get('/', categoryController.getCategories);

categoryRouter.get(
  '/:id',
  celebrate(categorySchema.getCategoryById),
  categoryController.getCategoryById
);

categoryRouter.post(
  '/',
  celebrate(categorySchema.createCategory),
  categoryController.createCategory
);

categoryRouter.put(
  '/:id',
  celebrate(categorySchema.updateCategory),
  categoryController.updateCategory
);

categoryRouter.delete(
  '/:id',
  celebrate(categorySchema.deleteCategory),
  categoryController.deleteCategory
);

export default categoryRouter;
