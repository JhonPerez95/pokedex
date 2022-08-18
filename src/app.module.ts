import { join } from 'path'
import { Module } from '@nestjs/common'
import { MongooseModule, Schema } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { PokemonModule } from './pokemon/pokemon.module'
import { SeedModule } from './seed/seed.module'
import { ConfigModule } from '@nestjs/config'
import { EmvConfiguration } from './config/app.config'
import { JoiValidationSchema } from './config/joi.validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EmvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
