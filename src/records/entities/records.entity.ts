import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { RecordDto } from '../dto/input-record.dto';

export class Record {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecordDto)
  Records: RecordDto[];
}
