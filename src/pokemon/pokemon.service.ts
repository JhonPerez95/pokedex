import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'
import { isValidObjectId, Model } from 'mongoose'
import { Pokemon } from './entities/pokemon.entity'
import { InjectModel } from '@nestjs/mongoose'
import { PaginationDto } from 'src/common/dto/pagination.dto'
@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon
    } catch (error) {
      this.handlerException(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto
    return await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v')
  }

  async findOne(id: string) {
    let pokemon: Pokemon

    // No
    if (!isNaN(+id)) {
      pokemon = await this.pokemonModel.findOne({ no: id })
    }

    // MongoId
    if (!pokemon && isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById({ _id: id })
    }

    // Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: id.toLowerCase().trim(),
      })
    }

    if (!pokemon)
      throw new NotFoundException('Pokemon not found with id: ' + id)

    return pokemon
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id)
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

    try {
      await this.pokemonModel.updateOne(updatePokemonDto)
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {
      this.handlerException(error)
    }
  }

  async remove(id: string) {
    const { acknowledged, deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    })

    if (deletedCount === 0) {
      throw new BadRequestException('Pokemon not found with id: ' + id)
    }
  }

  // Private methods
  private handlerException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon already exists ${JSON.stringify(error.keyValue)}`
      )
    }
    console.log(error)
    throw new InternalServerErrorException(
      'Can not create pokemon - Check logs server'
    )
  }
}
