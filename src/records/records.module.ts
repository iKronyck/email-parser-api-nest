import { Module } from '@nestjs/common';
import { RecordController } from './records.controller';
import { RecordService } from './records.service';

@Module({
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
