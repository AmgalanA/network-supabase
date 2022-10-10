export interface IPost {
  id: number;
  created_at: string;
  caption: string;
  profileId: number;
  likes: number[];
  imageUrl: string;
}
