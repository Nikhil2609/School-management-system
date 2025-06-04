import DepartmentRepository from '../repository/department.repository';

export default class DepartmentService {
  private departmentRepository: DepartmentRepository;

  constructor(departmentRepository: DepartmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  getDepartments = async () => {
    const categories = await this.departmentRepository.getDepartments();
    return categories;
  };

  getDepartmentById = async (departmentId: string) => {
    const department = await this.departmentRepository.getDepartmentById(departmentId);
    return department;
  };

  createDepartment = async (departmentData: any) => {
    const newDepartment = await this.departmentRepository.createDepartment(departmentData);
    return newDepartment;
  };

  updateDepartment = async (departmentId: string, departmentData: any) => {
    const updatedDepartment = await this.departmentRepository.updateDepartment(departmentId, departmentData);
    return updatedDepartment;
  };

  deleteDepartment = async (departmentId: string) => {
    const deletedDepartment = await this.departmentRepository.deleteDepartment(departmentId);
    return deletedDepartment;
  };
}
