import { ErrorResponse, SuccessResponse } from "../../../entity";
import {
  Result,
  WasteReportQueryParams,
  WasteReportResponse,
} from "../../../utils";
import { WasteReportDTO } from "../../dto";

export interface WasteReportRepository {
  createWasteReport(
    report: WasteReportDTO
  ): Promise<Result<SuccessResponse, ErrorResponse>>;
  getWasteReports(
    params?: WasteReportQueryParams
  ): Promise<Result<SuccessResponse<WasteReportResponse[]>, ErrorResponse>>;
}
