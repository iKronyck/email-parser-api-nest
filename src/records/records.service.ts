import { Injectable } from '@nestjs/common';
import { OutputRecordDto } from './dto/output-record.dto';
import { Record } from './entities/records.entity';

@Injectable()
export class RecordService {
  private isVerdictPassing(verdict: string): boolean {
    return verdict === 'PASS';
  }

  transformRecord(input: Record): OutputRecordDto[] {
    return input.Records.map((record) => {
      const { receipt, mail } = record.ses;
      const allVerdictsPass =
        this.isVerdictPassing(receipt.spfVerdict.status) &&
        this.isVerdictPassing(receipt.dkimVerdict.status) &&
        this.isVerdictPassing(receipt.dmarcVerdict.status);

      return {
        spam: this.isVerdictPassing(receipt.spamVerdict.status),
        virus: this.isVerdictPassing(receipt.virusVerdict.status),
        dns: allVerdictsPass,
        mes: new Date(mail.timestamp).toLocaleString('es-ES', {
          month: 'long',
        }),
        retrasado: receipt.processingTimeMillis > 1000,
        emisor: mail.source.split('@')[0],
        receptor: mail.destination.map((email) => email.split('@')[0]),
      };
    });
  }
}
