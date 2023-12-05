export type GetRecordsInput = {
	/**
	* @title Record Type 
	* @description The only valid record type at this time is "contact"
	*/
	record_type: string;

	/**
	* @title Include all fields?
	* @description This field doesn't do anything it is just an example of another type of field 
	*/
	include_all_fields?: boolean;
};