import { Module } from '@nestjs/common';
import { EmailParserModule } from './email-parser/email-parser.module';
import { RecordModule } from './records/records.module';

@Module({
  imports: [EmailParserModule, RecordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
