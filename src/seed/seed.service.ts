import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
 
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}
  
  async executeSeed() {

    this.pokemonModel.deleteMany({}); // delete * from Pokemon

    try {
      const {data} = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`);

      const insertPromisesArray = [];

      data.results.map(({name, url}) => {

        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];

        // await this.pokemonModel.create({no, name});
        insertPromisesArray.push(
          this.pokemonModel.create({no, name})
        );
      });

      await Promise.all(insertPromisesArray);

      return 'Seed Executerd';

    } catch (error) {
      console.log(error);
      throw new BadRequestException(`No data =(`);
    }
    
  }
}
