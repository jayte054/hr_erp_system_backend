import config from "../config/index";
import { Request, Response, Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const profile = path.resolve(__dirname, "../routes/profile.route.ts");
const auth = path.resolve(__dirname, "../routes/authentication.route.ts");
const apiSchema = path.resolve(__dirname, "../models/*.ts");

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger API Documentation for HR App",
      version: "1.0.0",
      description: "Documenting various apis for HR",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerformat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    host: `localhost:3001${config.PORT}`,
    basePath: "/",
  },
  apis: [apiSchema, profile, auth],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${config.PORT}/api-docs`);
};