docker-compose up --build -d

npx prisma migrate dev

export NODE_ENV=development
npx ts-node-dev --poll --exit-child --respawn --transpile-only --ignore-watch node_modules src/server.ts