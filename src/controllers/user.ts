import { Request, Response } from "express";
import { gcsHelper } from "../utils/googleCloudStorageHelper";
import db from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { parse } from "path";

export const UserController = {
  uploadPfp: async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (!userId) {
      res.status(400).send({
        status: "error",
        message: "Please provide a user ID",
      });

      return;
    }

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

      await db
        .update(usersTable)
        .set({ profilePicture: fileUrl })
        .where(eq(usersTable.id, parseInt(userId)));

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

  update: async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const { first_name, last_name, age, balance, username, email } = req.body;

    const payload = {
      first_name,
      last_name,
      age,
      balance,
      username,
      email,
    };

    try {
      await db
        .update(usersTable)
        .set(payload)
        .where(eq(usersTable.id, parseInt(userId)));
      res.send({
        status: "success",
        message: "User updated successfully",
        data: payload,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "error",
        message: "An error occurred while updating the user",
      });
    }
  },
};
