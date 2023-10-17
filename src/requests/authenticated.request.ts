import { Player } from "@prisma/client";
import { FastifyRequest } from "fastify";

export interface AuthenticatedRequest extends FastifyRequest {
    player: Player;
}