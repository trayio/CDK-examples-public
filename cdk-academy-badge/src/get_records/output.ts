//record object
export type GetRecordsObject = {
	LastModifiedDate: string,
	Email: string,
	AccountId: string,
	FirstName: string,
	Title: string,
	Name: string,
	Region__c: string,
	OwnerId: string,
	CreatedById: string,
	Phone: string,
	CreatedDate: string,
	LastName: string,
	Id: string,
	LastModifiedById: string,
};

export type GetRecordsOutput = {
	total: number;
	records: GetRecordsObject[]; //array of basic record objects
	next_page_offset: string;
};