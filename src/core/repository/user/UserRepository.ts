import { ErrorResponse, SuccessResponse } from "../../../entity";
import { Result, User, UserResponse } from "../../../utils";
import { LoginUserDTO } from "../../dto";

export interface UserRepository {
  loginUser(
    data: LoginUserDTO
  ): Promise<Result<SuccessResponse<UserResponse>, ErrorResponse>>;
  registerUser(user: User): Promise<Result<SuccessResponse, ErrorResponse>>;
}
