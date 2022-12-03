import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonDto } from './dto/person.dto';

@Injectable({})
export class PersonService {
  constructor(private prisma: PrismaService) {}
  async create(dto: PersonDto) {
    const person = await this.prisma.person.create({
      data: {
        name: dto.name,
        document: dto.document,
        birthDate:new Date(dto.birthDate)
      },
    });
    return person
  }
}
