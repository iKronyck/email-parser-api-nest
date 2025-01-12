import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { RecordService } from './records.service';
import { OutputRecordDto } from './dto/output-record.dto';
import { Record } from './entities/records.entity';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  transformRecord(
    @Body(new ValidationPipe({ transform: true })) input: Record,
  ): OutputRecordDto[] {
    return this.recordService.transformRecord(input);
  }
}
