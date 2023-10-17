import { Controller, GET, POST } from "fastify-decorators";
import PlayerService from "../services/player.service";
import createPlayerSchema, { CreatePlayerRequest } from "../schemas/create-player.schema";
import { FastifyReply } from "fastify";
import authMiddleware from "../middleware/auth.middleware";
import { AuthenticatedRequest } from "../requests/authenticated.request";

@Controller({ route: '/players' })
export default class PlayersController {
    constructor(private readonly playerService: PlayerService) {
        //
    }

    @GET('/', { preHandler: authMiddleware })
    public async index(request: AuthenticatedRequest) {
        return await this.playerService.getAllAsync();
    }

    @POST('/', { schema: createPlayerSchema })
    public async createPlayer(request: CreatePlayerRequest, reply: FastifyReply): Promise<FastifyReply> {
        if (await this.playerService.existsAsync(request.body.name)) {
            return reply.status(409).send({
                message: 'Player already exists with this username.'
            });
        }

        const player = await this.playerService.createAsync(request.body.name);

        return reply.status(201).send({
            id: player.id,
            username: player.displayName
        })
    }
}