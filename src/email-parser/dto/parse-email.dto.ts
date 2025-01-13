import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { EmlValidationPipe } from '../../common/pipes/url-eml-validation.pipe';

export class ParseEmailDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => new EmlValidationPipe().transform(value))
  url: string;
}
