import { hash, compare, genSalt } from "bcryptjs";
import { sql } from "drizzle-orm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db";
import { usersTable } from "../db/schema";
import { validationResult } from "express-validator";

const authController = {
  register: async (req: Request, res: Response) => {
    // check validaion from express-validator

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    // check if email already exists
    const emailExists = await db
      .select()
      .from(usersTable)
      .where(sql`${usersTable.email} = ${req.body.email}`);

    if (emailExists.length > 0) {
      res.status(400).send({
        message: "Email already exists",
      });
      return;
    }

    // destructure the required fields
    const { first_name, last_name, username, email, password, age } = req.body;

    try {
      // hash the password
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      try {
        // insert the user into the database
        await db.insert(usersTable).values({
          first_name,
          last_name,
          username,
          email,
          age,
          password: hashedPassword,
        });
      } catch (error) {
        console.log(error, "Error occurred while registering the user");

        res.status(500).send({
          message: "An error occurred while registering the user",
        });
        return;
      }

      res.send({
        status: "success",
        data: {
          first_name,
          last_name,
          username,
          email,
        },
      });
    } catch (error) {
      console.log(error, "Error occurred while hashing the password");

      res.status(500).send({
        message: "An error occurred while hashing the password",
      });
      return;
    }
  },

  login: async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { password, email } = req.body;

    const queryUser = await db
      .select()
      .from(usersTable)
      .where(sql`${usersTable.email} = ${email}`);

    if (queryUser.length == 0) {
      res.status(400).send({
        status: "error",
        error: "User Not Found !!",
      });
    }

    const existingUser = queryUser[0];

    const passwordMatch = await compare(password, existingUser.password);

    if (!passwordMatch) {
      res.status(403).send({
        status: "error",
        message: "Nguwawor Salah Password",
      });

      return;
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      res.status(500).send({
        error: "Internal Server Error, JWT LOM DISET COKK",
      });

      return;
    }

    try {
      const expiresIn = 3600;

      const token = jwt.sign(existingUser, jwtSecret, {
        expiresIn: expiresIn,
      });

      res.send({
        status: "success",
        data: {
          token,
          expiresIn,
        },
      });
    } catch (error) {
      res.status(500).send({
        error: "Internal Server Error",
        message: error,
      });
      return;
    }
  },

  logout: (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.send({
        message: "Logout Success",
      });
    });
  },
};

export default authController;
