import { ResultSetHeader } from "mysql2";
import { connection } from "../../config/db";
import { LoginUserDTO, UserRepository } from "../../core";
import { SuccessResponse, ErrorResponse } from "../../entity";
import {
  User,
  Result,
  generateUniqueIdentifier,
  UserResponse,
} from "../../utils";
import bcrypt from "bcryptjs";

export class UserRepositoryIn implements UserRepository {
  async registerUser(
    user: User
  ): Promise<Result<SuccessResponse, ErrorResponse>> {
    try {
      if (!user.email || !user.password || !user.firstName) {
        return {
          success: false,
          error: {
            errorMessage: "Missing Required Fields",
            statusCode: 400,
          },
        };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        return {
          success: false,
          error: {
            errorMessage: "Invalid email format",
            statusCode: 400,
          },
        };
      }

      const db = await connection;

      const [rows] = await db.execute(
        "SELECT * FROM `users` WHERE `email` = ? ",
        [user.email]
      );

      if ((rows as any[]).length > 0) {
        return {
          success: false,
          error: {
            errorMessage: "Email is already registered",
            statusCode: 409,
          },
        };
      }

      //hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      const uniqueId = generateUniqueIdentifier();

      //hardcoded for now for registering user  => role is user
      const role = "user";

      const [result] = await db.execute(
        "INSERT INTO users (`uniqueId`, `firstName`, `lastName`, `email`, `phoneNumber`, `address`, `password`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          uniqueId,
          user.firstName,
          user.lastName,
          user.email,
          user.phoneNumber,
          user.address,
          hash,
          role,
        ]
      );

      //error when inserting in the database
      const insertResult = result as ResultSetHeader;

      if (insertResult.affectedRows === 0) {
        return {
          success: false,
          error: {
            statusCode: 500,
            errorMessage: "Failed to insert user",
          },
        };
      }

      return {
        success: true,
        data: {
          statusCode: 200,
          message: "User registered successfully",
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          errorMessage: error instanceof Error ? error.message : String(error),
          statusCode: 500,
        },
      };
    }
  }

  async loginUser(
    data: LoginUserDTO
  ): Promise<Result<SuccessResponse<UserResponse>, ErrorResponse>> {
    try {
      if (!data.email || !data.password) {
        return {
          success: false,
          error: {
            errorMessage: "Email and Password are required",
            statusCode: 400,
          },
        };
      }

      const db = await connection;

      //check if the user exists
      const [rows] = await db.execute("SELECT * FROM users where email = ?", [
        data.email,
      ]);

      const users = rows as any[];

      if (users.length === 0) {
        return {
          success: false,
          error: {
            errorMessage: "User not found",
            statusCode: 404,
          },
        };
      }

      const user = users[0];

      //compare password to hashed one
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (!isMatch) {
        return {
          success: false,
          error: {
            errorMessage: "Incorrect password",
            statusCode: 401,
          },
        };
      }

      const response: UserResponse = {
        id: user.uniqueId,
        type: "User",
        role: user.role,
        attributes: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          password: user.password,
          userPicture: null,
          createdAt: user.createdAt,
        },
      };

      return {
        success: true,
        data: {
          statusCode: 200,
          message: "Login successfull",
          data: response,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: {
          errorMessage: error instanceof Error ? error.message : String(error),
          statusCode: 500,
        },
      };
    }
  }
}
