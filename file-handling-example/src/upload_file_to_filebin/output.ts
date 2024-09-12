import { FileReference } from "@trayio/cdk-dsl/connector/operation/OperationHandler";

type Bin = {
  id: string;
  readonly: boolean;
  bytes: number;
  bytes_readable: string;
  files: number;
  updated_at: string;
  updated_at_relative: string;
  created_at: string;
  created_at_relative: string;
  expired_at: string;
  expired_at_relative: string;
};

type File = {
  filename: string;
  "content-type": string;
  bytes: number;
  bytes_readable: string;
  md5: string;
  sha256: string;
  updated_at: string;
  updated_at_relative: string;
  created_at: string;
  created_at_relative: string;
};

export type FileBinApiResponse = {
  bin: Bin;
  file: File;
};

export type UploadFileToFilebinOutput = {
  file: FileReference;
};
