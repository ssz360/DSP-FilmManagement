-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Film" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT true,
    "watchDate" DATETIME NOT NULL,
    "rating" INTEGER NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Film_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filmId" INTEGER NOT NULL,
    "compeleted" BOOLEAN NOT NULL DEFAULT false,
    "reviewDate" DATETIME NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    CONSTRAINT "Review_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
