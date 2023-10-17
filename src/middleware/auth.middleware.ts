import { FastifyReply } from "fastify";
import { AuthenticatedRequest } from "../requests/authenticated.request";
import { PrismaClient } from "@prisma/client";
import { getInstanceByToken } from "fastify-decorators";
import DatabaseService from "../services/database.service";

export default async (request: AuthenticatedRequest, reply: FastifyReply, done: () => void) => {
    const databaseService = getInstanceByToken<DatabaseService>(DatabaseService);

    const player = await databaseService.client.player.findFirst({
        where: {
            displayName: 'Arv Cork'
        }
    });

    if (player) {
        request.player = player;
    }

    done();
}