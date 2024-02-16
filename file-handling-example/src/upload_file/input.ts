import { FileReference } from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export type UploadFileInput = {
	/**
	* @description The path of the file in dropbox, including filename and extension
	*/
	file_path: string;

	/**
	* @title File
	* @description The file object to be uploaded
	*/
	file: FileReference;
};
