import { ResultSetHeader } from "mysql2";
import { connection } from "../../config/db";
import { WasteReportDTO, WasteReportRepository } from "../../core";
import { SuccessResponse, ErrorResponse } from "../../entity";
import {
  generateUniqueIdentifier,
  normalizeParamsToString,
  Result,
  WasteReportQueryParams,
  WasteReportResponse,
} from "../../utils";
import qs from "qs";

export class WasteReportRepositoryIn implements WasteReportRepository {
  async createWasteReport(
    report: WasteReportDTO
  ): Promise<Result<SuccessResponse, ErrorResponse>> {
    try {
      const {
        userId,
        photo,
        description,
        latitude,
        longitude,
        location,
        sizeOfTrash,
        status,
      } = report;

      if (!description || !location) {
        return {
          success: false,
          error: {
            errorMessage: "Missing Required Fields",
            statusCode: 500,
          },
        };
      }

      const db = await connection;
      const uniqueId = generateUniqueIdentifier();

      const [result] = await db.execute(
        "INSERT INTO reports (`uniqueId`, `photo`, `description`, `latitude`, `longitude`, `sizeOfTrash`, `status`, `userId`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          uniqueId,
          photo,
          description,
          latitude,
          longitude,
          sizeOfTrash,
          status,
          userId,
        ]
      );

      //error when inserting in the database
      const insertResult = result as ResultSetHeader;

      if (insertResult.affectedRows === 0) {
        return {
          success: false,
          error: {
            statusCode: 500,
            errorMessage: "Failed to insert report",
          },
        };
      }

      return {
        success: true,
        data: {
          statusCode: 200,
          message: "Report Added Successfully",
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

  async getWasteReports(
    params?: WasteReportQueryParams
  ): Promise<Result<SuccessResponse<WasteReportResponse[]>, ErrorResponse>> {
    try {
      const db = await connection;

      const queryParams = params
        ? qs.parse(normalizeParamsToString(params))
        : {};

      const { status, search, userId } = queryParams;

      let query = "SELECT * FROM reports WHERE 1=1";
      const queryValues: any[] = [];

      if (status) {
        query += " AND status = ?";
        queryValues.push(status);
      }

      if (search) {
        query += " AND (description LIKE ? OR location LIKE ?)";
        queryValues.push(`%${search}%`, `%${search}%`);
      }

      if (userId) {
        query += " AND user_id = ?";
        queryValues.push(userId);
      }

      const [rows] = await db.execute(query, queryValues);

      return {
        success: true,
        data: {
          statusCode: 200,
          message: "Reports fetched successfully",
          data: rows as WasteReportResponse[],
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
