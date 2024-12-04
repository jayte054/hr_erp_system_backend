import config from "../config/index";
import { Request, Response, Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const profile = path.resolve(__dirname, "../routes/profile.route.ts");
const auth = path.resolve(__dirname, "../src/routes/auth.ts");
const apiSchema = path.resolve(__dirname, "../src/models/*.ts");

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger API Documentation for Smooze App",
      version: "1.0.0",
      description: "Documenting various apis for Smooze App",
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
    host: "localhost:7000",
    basePath: "/",
  },
  apis: [apiSchema, profile, auth],
};

const swaggerSpec = swaggerJSDoc(options);

//
export const swaggerDocs = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at https://localhost:${config.PORT}/api-docs`);
};