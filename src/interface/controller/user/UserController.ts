import { UserUsecase } from "../../../usecases";
import { Request, Response } from "express";
import { Result, UserResponse } from "../../../utils";
import { ErrorResponse, SuccessResponse } from "../../../entity";

export class UserController {
  constructor(private userUsecase: UserUsecase) {}

  async registerUser(req: Request, res: Response): Promise<void> {
    const result: Result<SuccessResponse, ErrorResponse> =
      await this.userUsecase.registerUser(req.body);

    if (!result.success) {
      res
        .status(result.error.statusCode)
        .json({ error: result.error.errorMessage });
      return;
    }

    res.status(result.data.statusCode).json({
      message: result.data.message,
      data: result.data.data,
    });
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const result: Result<
      SuccessResponse<UserResponse>,
      ErrorResponse
    > = await this.userUsecase.loginUser(req.body);

    if (!result.success) {
      res.status(result.error.statusCode).json({
        error: result.error.errorMessage,
      });

      return;
    }

    res.status(result.data.statusCode).json({
      message: result.data.message,
      data: result.data.data,
    });
  }
}
