import { Request, Response } from "express";
import { gcsHelper } from "../utils/googleCloudStorageHelper";

export const UserController = {
  uploadPfp: async (req: Request, res: Response) => {
    const photo = req.file;

    if (!photo) {
      res.status(400).send({
        status: "error",
        message: "Please upload a file",
        file: photo,
      });

      return;
    }

    try {
      const fileUrl = await gcsHelper.uploadFile({
        file: photo,
        folder: "profile-pictures",
      });

      res.send({
        status: "success",
        data: {
          url: fileUrl,
        },
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        message: "An error occurred while uploading the file",
      });

      return;
    }
  },
};
