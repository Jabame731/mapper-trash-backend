export class WasteReportDTO {
  constructor(
    public userId: string,
    public photo: string | null,
    public description: string,
    public latitude: string,
    public longitude: string,
    public location: string,
    public sizeOfTrash: string,
    public status: string
  ) {}
}
