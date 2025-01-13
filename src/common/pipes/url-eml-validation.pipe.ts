import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isFile, verifyFileExists } from '../utils/file';
import { isURL, verifyURL } from '../utils/url';

@Injectable()
export class EmlValidationPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      throw new BadRequestException('The url is required');
    }
    if (typeof value !== 'string') {
      throw new BadRequestException('The url must be a string');
    }
    if (isFile(value)) {
      verifyFileExists(value);
    } else if (isURL(value)) {
      verifyURL(value);
    }
    return value;
  }
}
