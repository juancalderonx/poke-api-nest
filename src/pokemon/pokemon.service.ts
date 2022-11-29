import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IsMongoId } from 'class-validator';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      
      if( error.code === 11000 ) {
        throw new BadRequestException(`That's Pokemon already exists in database. ERROR: ${ JSON.stringify( error.keyValue )} `);
      }

      throw new InternalServerErrorException(`Can't create Pokemon. Please check server logs`);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    // Verificación por number
    // Aquí no recibimos números. El condicional valida si el término de búsqueda es un número.
    if( !isNaN(+term) ) pokemon = await this.pokemonModel.findOne({ number: term });

    //Verificación por MongoID
    if(!pokemon && isValidObjectId(term)) pokemon = await this.pokemonModel.findById(term);

    //Verificación por name
    if(!pokemon) pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });

    // Si no cumple niguna condición, se retorna un 404.
    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or number ${term} not found`);

    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
