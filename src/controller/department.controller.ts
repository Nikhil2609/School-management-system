import { Request, Response } from 'express';
import DepartmentService from '../service/department.service';
import { ErrorResponse, SendResponse } from '../utils/responsehelper';
import { STATUS_CODE } from '../utils/enum';
import { PRODUCT_MESSAGE } from '../utils/messages';
import { MetaPaginationResponse } from '../utils/interface/IApiResponse';
import { PerPageRows } from '../utils/constant';

export default class DepartmentController {
  private departmentService: DepartmentService;

  constructor(departmentService: DepartmentService) {
    this.departmentService = departmentService;
  }

  getDepartments = async (req: Request, res: Response) => {
    const currentPage = Number(req.query.page || 1);
    const offsetRows = Number((currentPage - 1) * PerPageRows);

    const response = await this.departmentService.getDepartments();
    const metaResponse: MetaPaginationResponse = {
      totalRows: 20
    };
    return SendResponse(res, STATUS_CODE.OK, response, PRODUCT_MESSAGE.FETCH, metaResponse);
  };

  getDepartmentById = async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    const Department = await this.departmentService.getDepartmentById(departmentId);
    if (!Department) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, PRODUCT_MESSAGE.NOT_FOUND);
    }
    return SendResponse(res, STATUS_CODE.OK, Department, PRODUCT_MESSAGE.FETCH);
  };

  createDepartment = async (req: Request, res: Response) => {
    const departmentData = req.body;
    const newDepartment = await this.departmentService.createDepartment(departmentData);
    return SendResponse(res, STATUS_CODE.CREATED, newDepartment, PRODUCT_MESSAGE.CREATE);
  };

  updateDepartment = async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    const departmentData = req.body;
    const updatedDepartment = await this.departmentService.updateDepartment(departmentId, departmentData);

    if (!updatedDepartment) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, PRODUCT_MESSAGE.NOT_FOUND);
    }

    return SendResponse(res, STATUS_CODE.OK, updatedDepartment, PRODUCT_MESSAGE.UPDATE);
  };

  deleteDepartment = async (req: Request, res: Response) => {
    const departmentId = req.params.id;
    const deletedDepartment = await this.departmentService.deleteDepartment(departmentId);

    if (!deletedDepartment) {
      return ErrorResponse(res, STATUS_CODE.NOT_FOUND, PRODUCT_MESSAGE.NOT_FOUND);
    }

    return SendResponse(res, STATUS_CODE.OK, null, PRODUCT_MESSAGE.DELETE);
  };
}
