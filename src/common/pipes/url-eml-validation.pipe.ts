import { PipeTransform, Injectable } from '@nestjs/common';
import { isFile, verifyFileExists } from '../utils/file';
import { isURL, verifyURL } from '../utils/url';

@Injectable()
export class EmlValidationPipe implements PipeTransform {
  transform(value: string): string {
    if (isFile(value)) {
      verifyFileExists(value);
    } else if (isURL(value)) {
      verifyURL(value);
    }
    return value;
  }
}
