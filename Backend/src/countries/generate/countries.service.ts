/* eslint-disable @typescript-eslint/no-require-imports */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// Im sorry for this line also
const address = require('lib-address');
@Injectable()
export class GenerateService {
  async findAll() {
    try {
      const countries = await address.getRegisteredCountries();
      if (countries.length > 0) return countries;
      return new HttpException('Countries not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      return new HttpException(
        `Error getting countries: ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string) {
    try {
      const countryData = await address.getCountryData(id);
      if (!countryData)
        return new HttpException('Country not found', HttpStatus.NOT_FOUND);
      return countryData;
    } catch (error) {
      return new HttpException(`State missing ${error}`, HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} generate`;
  }
}
