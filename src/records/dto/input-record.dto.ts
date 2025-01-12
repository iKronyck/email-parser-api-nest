import { IsArray, IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class VerdictDto {
  @IsNotEmpty()
  status: string;
}

class ReceiptDto {
  @IsNotEmpty()
  processingTimeMillis: number;

  @ValidateNested()
  @Type(() => VerdictDto)
  spamVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  virusVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  spfVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dkimVerdict: VerdictDto;

  @ValidateNested()
  @Type(() => VerdictDto)
  dmarcVerdict: VerdictDto;
}

class MailDto {
  @IsNotEmpty()
  timestamp: string;

  @IsNotEmpty()
  source: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  destination: string[];
}

class SesDto {
  @ValidateNested()
  @Type(() => ReceiptDto)
  receipt: ReceiptDto;

  @ValidateNested()
  @Type(() => MailDto)
  mail: MailDto;
}

export class RecordDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SesDto)
  ses: SesDto;
}
