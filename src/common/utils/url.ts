import { BadRequestException } from '@nestjs/common';

export function verifyURL(value: string) {
  try {
    const parsedUrl = new URL(value);
    if (!parsedUrl.pathname.endsWith('.eml')) {
      throw new BadRequestException(
        "The URL doesn't point to a valid .eml file",
      );
    }
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
