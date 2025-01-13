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
  private async processParsedData(emailData: any) {
    try {
      if (emailData.attachments && emailData.attachments.length > 0) {
        const attachment = emailData.attachments[0];

        if (Buffer.isBuffer(attachment.content)) {
          try {
            const parsedJson = JSON.parse(attachment.content.toString());
            return parsedJson;
          } catch (parseError) {
            throw new BadRequestException(
              `Failed to parse JSON content from the attachment: ${parseError?.message}`,
            );
          }
        } else {
          throw new BadRequestException(
            `The content of the attachment is not valid JSON data.`,
          );
        }
      } else {
        throw new BadRequestException(
          `The email does not contain any attachments.`,
        );
      }
    } catch (attachmentError) {
      console.error('Error handling attachment:', attachmentError);
    }

    try {
      const urlMatch = emailData.html.match(urlRegex);

      if (urlMatch && urlMatch[1]) {
        const extractedUrl = urlMatch[1];
        const urlResponse = await axios.get(extractedUrl);

        try {
          const responseData = JSON.parse(JSON.stringify(urlResponse.data));
          if (typeof responseData === 'object' && responseData !== null) {
            return responseData;
          } else {
            try {
              const fallbackResponse = await axios.get(urlResponse.data);
              return fallbackResponse.data;
            } catch (fallbackError) {
              throw new BadRequestException(
                `Failed to fetch data from the provided URL: ${fallbackError.message}`,
              );
            }
          }
        } catch (jsonParsingError) {
          console.warn(
            'Error processing JSON response data:',
            jsonParsingError,
          );
          try {
            const secondaryResponse = await axios.get(urlResponse.data);
            return secondaryResponse.data;
          } catch (secondaryError) {
            throw new BadRequestException(
              `Unable to retrieve data from the provided URL: ${secondaryError.message}`,
            );
          }
        }
      } else {
        throw new BadRequestException(
          `No valid URL was found in the email content`,
        );
      }
    } catch (urlError) {
      console.error('Error processing email URL:', urlError);
      throw new BadRequestException(
        `The email didn't contain a valid JSON attachment or URL.`,
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
    console.log({ url });
    if (isURL(url)) {
      console.log('paso url');
      return await this.parseEmailFromURL(url);
    } else if (isFile(url)) {
      console.log('paso file');
      return await this.parseEmailFromFile(url);
    }
    throw new BadRequestException('The provided path does not exist');
  }
}
