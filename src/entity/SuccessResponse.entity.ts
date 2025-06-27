export class SuccessResponse<T = undefined> {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: T
  ) {}
}
