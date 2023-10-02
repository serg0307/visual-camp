export interface IUploadFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: BinaryData;
  size: number;
  entityType?: string;
  entityBundle?: string;
  entityFieldName?: string;
  entityUuid?: string;
}
