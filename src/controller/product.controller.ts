import { Request, Response } from 'express';
import ProductService from '../service/product.service';
import { ErrorResponse, SendResponse } from '../utils/responsehelper';
import { STATUS_CODE } from '../utils/enum';
import { PRODUCT_MESSAGE } from '../utils/messages';
import { MetaPaginationResponse } from '../utils/interface/IApiResponse';
import { PerPageRows } from '../utils/constant';

export default class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  getProducts = async (req: Request, res: Response) => {
    const currentPage = Number(req.query.page || 1);
    const offsetRows = Number((currentPage - 1) * PerPageRows);

    const response = await this.productService.getProducts(offsetRows);
    const metaResponse: MetaPaginationResponse = {
      totalRows: response.count
    };
    return SendResponse(res, STATUS_CODE.OK, response.rows, PRODUCT_MESSAGE.FETCH, metaResponse);
  };

  getProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const Product = await this.productService.getProductById(productId);
    if (!Product) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, PRODUCT_MESSAGE.NOT_FOUND);
    }
    return SendResponse(res, STATUS_CODE.OK, Product, PRODUCT_MESSAGE.FETCH);
  };

  createProduct = async (req: Request, res: Response) => {
    const productData = req.body;
    const newProduct = await this.productService.createProduct(productData);
    return SendResponse(res, STATUS_CODE.CREATED, newProduct, PRODUCT_MESSAGE.CREATE);
  };

  updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = await this.productService.updateProduct(productId, productData);

    if (!updatedProduct) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, PRODUCT_MESSAGE.NOT_FOUND);
    }

    return SendResponse(res, STATUS_CODE.OK, updatedProduct, PRODUCT_MESSAGE.UPDATE);
  };

  deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const deletedProduct = await this.productService.deleteProduct(productId);

    if (!deletedProduct) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, PRODUCT_MESSAGE.NOT_FOUND);
    }

    return SendResponse(res, STATUS_CODE.OK, null, PRODUCT_MESSAGE.DELETE);
  };
}
