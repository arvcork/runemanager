import { PrismaClient } from '@prisma/client';
import { Initializer, Service } from 'fastify-decorators';

@Service()
export default class DatabaseService {
  public client!: PrismaClient;

  @Initializer()
  public init() {
    if (!this.client) {
      this.client = new PrismaClient();
    }
  }
}