import { NextFunction, Request, Response } from 'express';
import CategoryService from '../service/catagory.service';
import { ErrorResponse, SendResponse } from '../utils/responsehelper';
import { STATUS_CODE } from '../utils/enum';
import { CATEGORY_MESSAGE } from '../utils/messages';

export default class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentPage = Number(req.query.page || 1);
      const offsetRows = Number((currentPage - 1) * 10);
      const categoriesResponse = await this.categoryService.getCategories(offsetRows);
      const metaResponse = {
        totalRows: categoriesResponse.count
      };
      return SendResponse(
        res,
        STATUS_CODE.OK,
        categoriesResponse.rows,
        CATEGORY_MESSAGE.FETCH,
        metaResponse
      );

      // render EJS template
      // return res.render("categories", {
      //   categories: categoriesResponse.rows,
      //   currentPage: currentPage
      // }
      // );
    } catch (error) {
      next(error);
    }
  };

  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = req.params.id;
      const category = await this.categoryService.getCategoryById(categoryId);
      if (!category) {
        return ErrorResponse(res, STATUS_CODE.NOT_FOUND, CATEGORY_MESSAGE.NOT_FOUND);
      }
      return SendResponse(res, STATUS_CODE.OK, category, CATEGORY_MESSAGE.FETCH);
    } catch (error) {
      next(error);
    }
  };

  createCategory = async (req: Request, res: Response) => {
    const categoryData = req.body;
    try {
      const newCategory = await this.categoryService.createCategory(categoryData);
      return SendResponse(res, STATUS_CODE.CREATED, newCategory, CATEGORY_MESSAGE.CREATE);
    } catch (error) {
      console.log('error=>', error);
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    const customerId = req.params.id;
    const customerData = req.body;
    const updatedCustomer = await this.categoryService.updateCategory(customerId, customerData);

    if (!updatedCustomer) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, CATEGORY_MESSAGE.NOT_FOUND);
    }

    return SendResponse(res, STATUS_CODE.OK, updatedCustomer, CATEGORY_MESSAGE.UPDATE);
  };

  deleteCategory = async (req: Request, res: Response) => {
    const customerId = req.params.id;

    const categoryExistInProducts = await this.categoryService.getProductsByCategory(customerId);
    if (categoryExistInProducts?.length > 0) {
      return ErrorResponse(
        res,
        STATUS_CODE.BAD_REQUEST,
        CATEGORY_MESSAGE.CATEGORY_EXIST_IN_PRODUCT
      );
    }

    const deletedCategory = await this.categoryService.deleteCategory(customerId);

    if (!deletedCategory) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, CATEGORY_MESSAGE.NOT_FOUND);
    }

    return SendResponse(res, STATUS_CODE.OK, null, CATEGORY_MESSAGE.DELETE);
  };
}
