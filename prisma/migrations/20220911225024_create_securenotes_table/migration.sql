-- CreateTable
CREATE TABLE "securenotes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "securenotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "securenotes_title_userId_key" ON "securenotes"("title", "userId");

-- AddForeignKey
ALTER TABLE "securenotes" ADD CONSTRAINT "securenotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
