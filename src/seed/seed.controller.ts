import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService
  ) {}

  @Get()
  @HttpCode( HttpStatus.CREATED )
  getSeed() {
    return this.seedService.runSeed();
  }

}
