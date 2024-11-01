import { Router } from "express";
import { multerUpload } from "../utils/googleCloudStorageHelper";
import { UserController } from "../controllers/user";

const userRouter = Router();

userRouter.post(
  "/upload-pfp/:userId",
  multerUpload.single("photo"),
  UserController.uploadPfp
);

export default userRouter;
