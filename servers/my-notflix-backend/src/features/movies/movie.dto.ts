import { Type } from "class-transformer";
import { IsNumber, Min, IsNotEmpty } from "class-validator";

export class GetMoviesDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number = 1;
}

export class GetMovieWithCreditsDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
