-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "groupId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Right" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Right_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RightToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToRight" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_RightToUser_AB_unique" ON "_RightToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RightToUser_B_index" ON "_RightToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToRight_AB_unique" ON "_GroupToRight"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToRight_B_index" ON "_GroupToRight"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RightToUser" ADD CONSTRAINT "_RightToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Right"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RightToUser" ADD CONSTRAINT "_RightToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToRight" ADD CONSTRAINT "_GroupToRight_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToRight" ADD CONSTRAINT "_GroupToRight_B_fkey" FOREIGN KEY ("B") REFERENCES "Right"("id") ON DELETE CASCADE ON UPDATE CASCADE;
