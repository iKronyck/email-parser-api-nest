import { BadRequestException } from '@nestjs/common';
import { existsSync } from 'node:fs';
import { extname } from 'node:path';

export function verifyFileExists(value: string): boolean {
  if (existsSync(value)) {
    if (extname(value) === '.eml') {
      return true;
    } else {
      throw new BadRequestException(
        "The provided path doesn't point to a .eml file",
      );
    }
  } else {
    throw new BadRequestException('The provided path does not exist');
  }
}

export function isFile(file: string): boolean {
  return existsSync(file);
}
