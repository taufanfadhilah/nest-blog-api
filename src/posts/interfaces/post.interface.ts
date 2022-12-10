export default interface IPost {
  id: number;
  user_id?: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}
