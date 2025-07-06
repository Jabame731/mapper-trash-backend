export interface WasteReport {
  photo: string;
  description: string;
  latitude: string;
  longitude: string;
  location: string;
  sizeOfTrash: string;
  status: string;
  userId: string;
}

export interface WasteReportResponse {
  id: string;
  type: string;
  attributes: WasteReport;
}

export interface WasteReportQueryParams {
  [key: string]: any;
}
