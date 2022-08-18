import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import axios, { AxiosInstance } from 'axios'
import { Model } from 'mongoose'
import { Pokemon } from 'src/pokemon/entities/pokemon.entity'
import { PokemonResponse } from './interface/poke-response.interface'
@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany()

    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=50'
    )

    const dataResult = data.results.map((item) => {
      const segments = item.url.split('/')
      return {
        name: item.name,
        no: +segments[segments.length - 2],
      }
    })

    // await Promise.all(dataResult)

    await this.pokemonModel.insertMany(dataResult)

    return 'Seed executed !'
  }
}
