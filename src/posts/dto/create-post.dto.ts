import { IsString } from 'class-validator';
export class CreatePostDto {
  user_id?: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
