-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filmId" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "reviewDate" DATETIME,
    "rating" INTEGER,
    "review" TEXT,
    "issuedById" INTEGER,
    "invitedUserId" INTEGER,
    "userId" INTEGER,
    CONSTRAINT "Review_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Review_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Review_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("completed", "filmId", "id", "invitedUserId", "issuedById", "rating", "review", "reviewDate") SELECT "completed", "filmId", "id", "invitedUserId", "issuedById", "rating", "review", "reviewDate" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
