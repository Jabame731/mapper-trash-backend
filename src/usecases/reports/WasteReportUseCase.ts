import { WasteReportDTO, WasteReportRepository } from "../../core";
import { ErrorResponse, SuccessResponse } from "../../entity";
import {
  Result,
  WasteReport,
  WasteReportQueryParams,
  WasteReportResponse,
} from "../../utils";

export class WasteReportUseCase {
  constructor(private reportRepo: WasteReportRepository) {}

  async createWasteReport(
    report: WasteReport
  ): Promise<Result<SuccessResponse, ErrorResponse>> {
    const data = new WasteReportDTO(
      report.userId,
      report.photo,
      report.description,
      report.latitude,
      report.longitude,
      report.location,
      report.sizeOfTrash,
      report.status
    );

    const res = await this.reportRepo.createWasteReport(data);

    return res;
  }

  async getWasteReports(
    params: WasteReportQueryParams
  ): Promise<Result<SuccessResponse<WasteReportResponse[]>, ErrorResponse>> {
    const result = await this.reportRepo.getWasteReports(params);

    return result;
  }
}
