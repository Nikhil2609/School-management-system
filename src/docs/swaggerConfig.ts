import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for Auth routes'
    },
    components: {
      securitySchemes: {
        tokenHeader: {
          type: 'apiKey',
          in: 'header',
          name: 'token',
          description: 'Custom header to pass JWT token'
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:3001/api'
      }
    ]
  },
  apis: ['**/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
