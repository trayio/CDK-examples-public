import { FileReference } from "@trayio/cdk-dsl/connector/operation/OperationHandler";

export type UploadImageInput = {
	source: File | URL;
	/**
 	* @title File name
 	* @description The name of the file, this is automatically detected if uploading a file.
 	*/
	name?: string;
	/**
	* @title Title
 	* @description The title of the image.
 	*/
	title?: string;
	/**
	* @title Description
 	* @description The description of the image.
 	*/
	description?: string;
};

/**
 * @title File
 * @description The file object to be uploaded
 */
export type File = {
	file: FileReference;
};

/**
 * @title URL
 * @description URL of the image to be uploaded
 */
type URL = {
	url: string;
}