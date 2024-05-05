-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) DEFAULT 'Please Add Your Name',
    "email" VARCHAR(100) NOT NULL,
    "username" VARCHAR(80),
    "password" VARCHAR(255) NOT NULL,
    "address" TEXT DEFAULT 'Please Add Your Address',
    "occupation" VARCHAR(80) DEFAULT 'Please Add Your Occupation',
    "avatar_url" TEXT DEFAULT 'Please Add Your Profile Picture',
    "created_at" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");
