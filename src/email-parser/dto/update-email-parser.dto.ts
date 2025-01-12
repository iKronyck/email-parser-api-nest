import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailParserDto } from './create-email-parser.dto';

export class UpdateEmailParserDto extends PartialType(CreateEmailParserDto) {}
