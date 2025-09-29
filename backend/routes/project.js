import express from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { createProject } from "../controllers/project.js";
import { projectSchema } from "../libs/validate-schema.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.post(
  "/:workspaceId/create-project",
  authMiddleware,
  validateRequest({
    params: z.object({
      workspaceId: z.string(),
    }),
    body: projectSchema,
  }),
  createProject
);

export default router;
