export type UploadImageOutput = {
	id: number;
	title: string;
	data: {
		id: string,
		title: string,
		description: string,
		datetime: number,
		type: string,
		animated: boolean,
		width: number,
		height: number,
		size: number,
		views: number,
		bandwidth: number,
		favorite: false,
		account_url: string,
		account_id: number,
		is_ad: boolean,
		in_most_viral: boolean,
		has_sound: boolean,
		tags: string[],
		ad_type: number,
		ad_url: string,
		in_gallery: boolean,
		deletehash: string,
		name: string,
		link: string
	  },
};
