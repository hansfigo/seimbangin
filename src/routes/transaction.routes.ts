import { Router } from "express";
import { transactionController } from "../controllers/transaction";
import authenticateJWT from "../middleware/jwt";
import validate from "../middleware/validate";

const transactionRouter = Router();

transactionRouter.post(
  "/",
  authenticateJWT,
  validate.transaction,
  transactionController.create
);

export default transactionRouter;
