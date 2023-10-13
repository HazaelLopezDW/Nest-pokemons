import { BadRequestException, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;
  private pokemonService: PokemonService;
  
  async executeSeed() {
    try {
      const {data} = await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`);

      const dtoData = data.results.map(({name, url}) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2];
        return {no, name};
      });

      dtoData.forEach(async (data) => {
        this.pokemonService.create(data);
      });

    } catch (error) {
      console.log(error);
      throw new BadRequestException(`No data =(`);
    }
    
  }
}
