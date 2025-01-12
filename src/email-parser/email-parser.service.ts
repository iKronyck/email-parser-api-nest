import { Injectable } from '@nestjs/common';
import { CreateEmailParserDto } from './dto/create-email-parser.dto';
import { UpdateEmailParserDto } from './dto/update-email-parser.dto';

@Injectable()
export class EmailParserService {
  create(createEmailParserDto: CreateEmailParserDto) {
    return 'This action adds a new emailParser';
  }

  findAll() {
    return `This action returns all emailParser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailParser`;
  }

  update(id: number, updateEmailParserDto: UpdateEmailParserDto) {
    return `This action updates a #${id} emailParser`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailParser`;
  }
}
