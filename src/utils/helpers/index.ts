import { WasteReportQueryParams } from "../waste-reports/report";

export const generateUniqueIdentifier = (): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniqueIdentifier = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueIdentifier += characters.charAt(randomIndex);
  }
  return uniqueIdentifier;
};

export function normalizeParamsToString(
  params: WasteReportQueryParams
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in params) {
    if (params[key] !== undefined) {
      result[key] = String(params[key]);
    }
  }
  return result;
}
