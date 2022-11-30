import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import axios, { AxiosInstance } from 'axios';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async runSeed() {

    await this.pokemonModel.deleteMany({}); // DELETE * FROM Pokemon

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    const pokemonToInsert: {name: string, number: number}[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const number = +segments[ segments.length - 2 ];
      console.log({name, number});
      pokemonToInsert.push({name, number});
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed successfully';
  }

}
