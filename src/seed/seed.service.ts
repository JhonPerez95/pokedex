import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AxiosAdapter } from 'src/common/adapters/request-adapter'
import { Pokemon } from 'src/pokemon/entities/pokemon.entity'
import { PokemonResponse } from './interface/poke-response.interface'
@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany()

    const data = await this.http.get<PokemonResponse>(
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
