export type Post = {
  userId: number;
  id: string;
  title: string;
  body: string;
};
export type ListPostsOutput = {
  results: Post[];
};
