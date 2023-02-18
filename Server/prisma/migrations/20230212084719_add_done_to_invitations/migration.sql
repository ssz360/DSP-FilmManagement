-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invitations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filmId" INTEGER NOT NULL,
    "issuerId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Invitations_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invitations_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invitations_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Invitations" ("filmId", "id", "issuerId", "reviewerId") SELECT "filmId", "id", "issuerId", "reviewerId" FROM "Invitations";
DROP TABLE "Invitations";
ALTER TABLE "new_Invitations" RENAME TO "Invitations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
