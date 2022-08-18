import { Injectable, InternalServerErrorException } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import { HttpAdapter } from '../interfaces/http-adapter.interface'

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url)
      return data
    } catch (error) {
      throw new InternalServerErrorException(
        'Error on request comunication with admin !'
      )
    }
  }
}

@Injectable()
export class FetchAdapter implements HttpAdapter {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url)
      const { data } = await response.json()
      return data
    } catch (error) {
      throw new InternalServerErrorException(
        'Error on request comunication with admin !'
      )
    }
  }
}
