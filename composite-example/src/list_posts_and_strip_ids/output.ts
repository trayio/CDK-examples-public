export type SimplifiedPost = {
  title: string;
  body: string;
};

export type ListPostsAndStripIdsOutput = {
  results: SimplifiedPost[];
};
