import { LoginUserDTO, RegisterUserDTO } from "../../core";
import { UserRepository } from "../../core/repository";
import { ErrorResponse, SuccessResponse } from "../../entity";
import { Result, User, UserResponse } from "../../utils";

export class UserUsecase {
  constructor(private userRepo: UserRepository) {}

  async loginUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Result<SuccessResponse<UserResponse>, ErrorResponse>> {
    const data = new LoginUserDTO(email, password);

    const result = await this.userRepo.loginUser(data);

    return result;
  }

  async registerUser(
    user: User
  ): Promise<Result<SuccessResponse, ErrorResponse>> {
    const data = new RegisterUserDTO(
      user.firstName,
      user.lastName,
      user.email,
      user.phoneNumber,
      user.address,
      user.password,
      user.userPicture,
      user.createdAt
    );

    const result = await this.userRepo.registerUser(data);

    return result;
  }
}
