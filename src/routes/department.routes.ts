import express from 'express';
import DepartmentRepository from '../repository/department.repository';
import DepartmentService from '../service/department.service';
import DepartmentController from '../controller/department.controller';
import { DepartmentSchema } from '../utils/validations';
import { celebrate } from 'celebrate';

const departmentRouter = express.Router();

const departmentRepository = new DepartmentRepository();
const departmentService = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(departmentService);

departmentRouter.get('/', departmentController.getDepartments);
departmentRouter.get('/:id', celebrate(DepartmentSchema.get), departmentController.getDepartmentById);
departmentRouter.post('/', celebrate(DepartmentSchema.create), departmentController.createDepartment);
departmentRouter.put('/:id', celebrate(DepartmentSchema.update), departmentController.updateDepartment);
departmentRouter.delete('/:id', celebrate(DepartmentSchema.delete), departmentController.deleteDepartment);

export default departmentRouter;
