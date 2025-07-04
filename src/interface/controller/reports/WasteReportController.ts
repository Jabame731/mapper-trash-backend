import { ErrorResponse, SuccessResponse } from "../../../entity";
import { WasteReportUseCase } from "../../../usecases";
import { Request, Response } from "express";
import { Result, WasteReportResponse } from "../../../utils";

export class WasteReportController {
  constructor(private reportUseCase: WasteReportUseCase) {}

  async createWasteReport(req: Request, res: Response): Promise<void> {
    const result: Result<SuccessResponse, ErrorResponse> =
      await this.reportUseCase.createWasteReport(req.body);

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

  async getWasteReports(req: Request, res: Response): Promise<void> {
    const result: Result<
      SuccessResponse<WasteReportResponse[]>,
      ErrorResponse
    > = await this.reportUseCase.getWasteReports(req.params);
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
