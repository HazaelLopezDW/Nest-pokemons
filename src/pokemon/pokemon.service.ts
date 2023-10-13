import { Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;

    } catch (error) {
      if(error.code === 11000) {
        throw new BadRequestException(`This Pokemon exists in DB ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
   
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: string) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: string) {
    return `This action removes a #${id} pokemon`;
  }
}
