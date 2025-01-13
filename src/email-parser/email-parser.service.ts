import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { simpleParser } from 'mailparser';
import { createReadStream } from 'node:fs';
import { Readable } from 'node:stream';
import axios from 'axios';
import { isFile } from '../common/utils/file';
import { isURL } from '../common/utils/url';

const urlRegex = /<a[^>]+href="([^"]+)"/;

@Injectable()
export class EmailParserService {
  private async processParsedData(parsedEmail: any) {
    if (parsedEmail?.attachments && parsedEmail.attachments.length > 0) {
      const firstAttachment = parsedEmail.attachments[0];

      if (Buffer.isBuffer(firstAttachment.content)) {
        try {
          const jsonContent = JSON.parse(firstAttachment.content.toString());
          return jsonContent;
        } catch (error) {
          throw new BadRequestException(
            `Unable to parse the JSON content in the attachment: ${error}`,
          );
        }
      } else {
        throw new BadRequestException(
          'The first attachment does not contain valid JSON data.',
        );
      }
    }

    try {
      const hasHTML = parsedEmail.html;

      let match = hasHTML
        ? parsedEmail.html?.match(urlRegex)
        : parsedEmail.headers;

      if (!hasHTML) {
        if (match.get('https')) {
          match = ['', `https:${match.get('https')}`];
        } else {
          const obj: { [key: string]: string } = {};
          match.forEach((value, key) => {
            obj[key] = value;
          });
          const cleanKey = Object.keys(obj)[0].replace(/[\r\n\s]+/g, '');
          const jsonValue = JSON.parse(obj[Object.keys(obj)[0]]);

          const result = {
            [cleanKey]: jsonValue,
          };
          return result;
        }
      }

      if (match && match[1]) {
        const url = match[1];

        try {
          const urlData = await axios.get(url);
          const jsonData = urlData.data;

          if (typeof jsonData === 'object' && jsonData !== null) {
            return jsonData;
          }

          const fallbackResponse = await axios.get(jsonData);
          return fallbackResponse.data;
        } catch (error) {
          throw new BadRequestException(
            `Failed to fetch or process the data from the provided URL: ${error}`,
          );
        }
      } else {
        throw new BadRequestException(
          'No valid URL found in the email content.',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while processing the email content URL: ${error}`,
      );
    }
  }

  private async parseEmailFromURL(url: string) {
    try {
      const response = await axios.get<Readable>(url, {
        responseType: 'stream',
      });
      const parsedEmail = await simpleParser(response.data);
      return this.processParsedData(parsedEmail);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error parsing email url: ${error.message}`,
      );
    }
  }

  private async parseEmailFromFile(path: string) {
    try {
      const fileStream = createReadStream(path);
      const parsedEmail = await simpleParser(fileStream);
      return this.processParsedData(parsedEmail);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error parsing email file: ${error.message}`,
      );
    }
  }

  async parseEmail(url: string) {
    if (isURL(url)) {
      return await this.parseEmailFromURL(url);
    } else if (isFile(url)) {
      return await this.parseEmailFromFile(url);
    }
    throw new BadRequestException('The provided path does not exist');
  }
}
