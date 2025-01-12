import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailParserService } from './email-parser.service';
import { CreateEmailParserDto } from './dto/create-email-parser.dto';
import { UpdateEmailParserDto } from './dto/update-email-parser.dto';

@Controller('email-parser')
export class EmailParserController {
  constructor(private readonly emailParserService: EmailParserService) {}

  @Post()
  create(@Body() createEmailParserDto: CreateEmailParserDto) {
    return this.emailParserService.create(createEmailParserDto);
  }

  @Get()
  findAll() {
    return this.emailParserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailParserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailParserDto: UpdateEmailParserDto,
  ) {
    return this.emailParserService.update(+id, updateEmailParserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailParserService.remove(+id);
  }
}
