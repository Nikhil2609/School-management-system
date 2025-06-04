import { Department } from '@prisma/client';
import prisma from '../prisma';

export default class DepartmentRepository {
  constructor() { }

  getDepartments = async () => {
    return await prisma.department.findMany();
  };

  getDepartmentById = async (departmentId: string) => {
    return await prisma.department.findUnique({ where: { id: Number(departmentId) } });
  };

  createDepartment = async (departmentData: Department) => {
    return await prisma.department.create({ data: departmentData });
  };

  updateDepartment = async (departmentId: string, departmentData: Department) => {
    const department = await prisma.department.findUnique({ where: { id: Number(departmentId) } });
    if (!department) {
      return null;
    }
    await prisma.department.update({ data: departmentData, where: { id: Number(departmentId) } })
    return department;
  };

  deleteDepartment = async (departmentId: string) => {
    const department = await prisma.department.findUnique({ where: { id: Number(departmentId) } });
    if (!department) {
      return null;
    }
    await prisma.department.delete({ where: { id: Number(departmentId) } });
    return department;
  };
}
