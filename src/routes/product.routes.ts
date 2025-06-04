import express from 'express';
import ProductRepository from '../repository/product.repository';
import ProductService from '../service/product.service';
import ProductController from '../controller/product.controller';
import { ProductSchema } from '../utils/validations';
import { celebrate } from 'celebrate';

const productRouter = express.Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', celebrate(ProductSchema.get), productController.getProductById);
productRouter.post('/', celebrate(ProductSchema.create), productController.createProduct);
productRouter.put('/:id', celebrate(ProductSchema.update), productController.updateProduct);
productRouter.delete('/:id', celebrate(ProductSchema.delete), productController.deleteProduct);

export default productRouter;
