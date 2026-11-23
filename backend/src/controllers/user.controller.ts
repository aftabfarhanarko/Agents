import bcrypt from "bcrypt";
import type { RequestHandler } from "express";
import { database } from "../config/database";

export const getAllUser: RequestHandler = async (_request, response, next) => {
  try {
    const result = await database.query(
      "SELECT id, name, email FROM users ORDER BY id",
    );

    response.status(200).json({
      success: true,
      total: result.rowCount ?? result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const postUser: RequestHandler = async (request, response, next) => {
  const { id, name, email, password } = request.body ?? {};

  if (
    (id != null && (!Number.isInteger(id) || id < 1)) ||
    ![name, email, password].every(
      (value) => typeof value === "string" && value.trim(),
    )
  ) {
    response.status(400).json({
      success: false,
      message:
        "Provide a positive integer id (optional), a name, an email, and a password.",
    });
    return;
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const storedPassword = await bcrypt.hash(password, 10);

    const result =
      id === undefined
        ? await database.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
            [name.trim(), normalizedEmail, storedPassword],
          )
        : await database.query(
            "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email",
            [id, name.trim(), normalizedEmail, storedPassword],
          );

    response.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      response.status(409).json({
        success: false,
        message: "A user with this id or email already exists.",
      });
      return;
    }

    next(error);
  }
};


export const loginUser: RequestHandler = async (request, response, next) => {
  const { email, password } = request.body ?? {};

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    response.status(400).json({
      success: false,
      message: "Provide an email and password.",
    });
    return;
  }

  try {
    const result = await database.query(
      "SELECT id, name, email, password FROM users WHERE email = $1",
      [email.trim().toLowerCase()],
    );

    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      response.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    response.status(200).json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};
