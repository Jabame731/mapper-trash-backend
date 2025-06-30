export class RegisterUserDTO {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public address: string,
    public password: string,
    public userPicture: string | null
  ) {}
}
