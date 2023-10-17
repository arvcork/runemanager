import S from 'fluent-json-schema';
import { AuthenticatedRequest } from 'src/requests/authenticated.request';

export interface CreatePlayerRequest extends AuthenticatedRequest {
    body: {
        name: string
    }
}

const createPlayerSchema = S.object()
    .prop('name', S.string().required());

export default {
    body: createPlayerSchema
}