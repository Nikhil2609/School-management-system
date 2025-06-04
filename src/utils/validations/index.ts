import Joi from 'joi';

export const DepartmentSchema = {
  create: {
    body: {
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      category_id: Joi.number().required()
    }
  },
  update: {
    body: {
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      category_id: Joi.number().required()
    },
    params: {
      id: Joi.number().required()
    }
  },
  delete: {
    params: {
      id: Joi.number().required()
    }
  },
  get: {
    params: {
      id: Joi.number().required()
    }
  }
};
