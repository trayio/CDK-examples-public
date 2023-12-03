export type genreObject = {
	id: number,
	name: string
}

export type GetMovieGenresOutput = {
	genres: genreObject[];
};