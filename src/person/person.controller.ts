import { Body, Controller, Post } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Post('create')
  async create(@Body() dto: PersonDto) {
    return await this.personService.create(dto);
  }
}