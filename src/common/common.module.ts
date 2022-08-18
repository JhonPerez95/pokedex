import { Module } from '@nestjs/common'
import { AxiosAdapter, FetchAdapter } from './adapters/request-adapter'

@Module({
  imports: [],
  providers: [AxiosAdapter,],
  exports: [AxiosAdapter,],
})
export class CommonModule {}
