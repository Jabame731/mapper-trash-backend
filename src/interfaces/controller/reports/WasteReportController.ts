import { ErrorResponse, SuccessResponse } from "../../../entity";
import { WasteReportUseCase } from "../../../usecases";
import { Request, Response } from "express";
import { Result, WasteReportResponse } from "../../../utils";
import { AuthRequest } from "../../middleware/authMiddleware";

export class WasteReportController {
  constructor(private reportUseCase: WasteReportUseCase) {}

  async createWasteReport(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;

    const result: Result<SuccessResponse, ErrorResponse> =
      await this.reportUseCase.createWasteReport({ ...req.body, userId });

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
    > = await this.reportUseCase.getWasteReports(req.query);
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
