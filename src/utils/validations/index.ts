import Joi from 'joi';

export const categorySchema = {
  createCategory: {
    body: {
      name: Joi.string().required()
    }
  },
  updateCategory: {
    body: {
      name: Joi.string().required()
    },
    params: {
      id: Joi.number().required()
    }
  },
  deleteCategory: {
    params: {
      id: Joi.number().required()
    }
  },
  getCategoryById: {
    params: {
      id: Joi.number().required()
    }
  }
};

export const ProductSchema = {
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
