-- CreateEnum
CREATE TYPE "skills" AS ENUM ('overall', 'attack', 'strength', 'defence', 'range', 'prayer', 'magic', 'runecrafting', 'construction', 'hitpoints', 'agility', 'herblore', 'thieving', 'crafting', 'fletching', 'slayer', 'hunter', 'mining', 'smithing', 'fishing', 'cooking', 'firemaking', 'woodcutting', 'farming');

-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(12) NOT NULL,
    "displayName" VARCHAR(12) NOT NULL,
    "skillSnapshotId" INTEGER,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_snapshots" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "skill" "skills" NOT NULL DEFAULT 'overall',
    "rank" INTEGER NOT NULL DEFAULT -1,
    "experience" INTEGER NOT NULL DEFAULT -1,
    "syncedAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skill_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_username_key" ON "players"("username");

-- CreateIndex
CREATE UNIQUE INDEX "players_displayName_key" ON "players"("displayName");

-- CreateIndex
CREATE INDEX "player_latest_skill_snapshot_id" ON "players"("skillSnapshotId");

-- CreateIndex
CREATE INDEX "skill_snapshot_player_id_created_at" ON "skill_snapshots"("playerId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_skillSnapshotId_fkey" FOREIGN KEY ("skillSnapshotId") REFERENCES "skill_snapshots"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "skill_snapshots" ADD CONSTRAINT "skill_snapshots_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
