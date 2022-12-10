import { IsString, IsInt, IsNotEmpty } from 'class-validator';
export class CreatePostDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
