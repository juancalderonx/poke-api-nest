import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  // Este transform lo está sobreescribiendo desde PipeTransform
  transform(value: string, metadata: ArgumentMetadata) {

    if(!isValidObjectId(value)) throw new BadRequestException(`Error, no estás ingresando un MongoID válido.`);

    return value.toUpperCase();
  }
}
