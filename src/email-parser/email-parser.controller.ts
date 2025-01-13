import { Controller, Get, Query } from '@nestjs/common';
import { EmailParserService } from './email-parser.service';
import { EmlValidationPipe } from '../common/pipes/url-eml-validation.pipe';
// import { ParseEmailDto } from './dto/parse-email.dto';

@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Get()
  parseEmailByURL(@Query('url', EmlValidationPipe) url: string) {
    return this.emailParserService.parseEmail(url);
  }
}
