import app from './app';

const server = app()

server.listen({ port: Number(process.env.PORT) || 3000 }, (err: Error | null) => {
  console.log(err);
  if (err !== null) {
    server.log.error(err);
    process.exit(1);
  }
});