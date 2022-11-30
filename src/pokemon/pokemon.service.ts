import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
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
      this.handleExceptions(error);
    }
  }

  findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
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

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term );

    if(updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(), ...updatePokemonDto};
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async remove(id: string) {
    const result = await this.pokemonModel.deleteOne( { _id: id } ) //El guion bajo es porque así se llama el ID en Mongo

    if(result.deletedCount === 0) throw new NotFoundException(`Error, no se ha encontrado un Pokemon con el MongoID ${id}`);

    return result;
  }

  // Custom functions

  //Excepción no controlada.
  private handleExceptions(error) {
    if( error.code === 11000 ) {
      throw new BadRequestException(`Error, no puedes asignarle al Pokemon un Número ya ocupado por otro Pokemon ${ JSON.stringify( error.keyValue )} `);
    }

    throw new InternalServerErrorException(`Can't create Pokemon. Please check server logs`);
  }
}
