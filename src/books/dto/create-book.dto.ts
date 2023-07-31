import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDTO {
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;
}
