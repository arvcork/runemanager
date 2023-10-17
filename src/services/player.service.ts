import { Player } from '@prisma/client';
import { Service } from "fastify-decorators";
import DatabaseService from "./database.service";

@Service()
export default class PlayerService {
    constructor(private readonly database: DatabaseService) {
        //
    }

    public async getAllAsync(): Promise<Player[]> {
        return this.database.client.player.findMany();
    }

    public async existsAsync(name: string): Promise<boolean> {
        return await this.database.client.player
            .findMany({
                where: { username: name },
                select: { id: true },
                take: 1
            })
            .then(r => r.length > 0);
    }

    public async createAsync(name: string): Promise<Player> {
        return this.database.client.player.create({
            data: {
                username: name,
                displayName: name
            }
        })
    }
}