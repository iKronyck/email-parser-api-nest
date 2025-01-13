import { BadRequestException } from '@nestjs/common';

export function verifyURL(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    throw new BadRequestException(
      'The input is neither a valid URL nor an existing local path',
    );
  }
}

export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
