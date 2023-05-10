-- DropForeignKey
ALTER TABLE "spendings" DROP CONSTRAINT "spendings_user_id_fkey";

-- AddForeignKey
ALTER TABLE "spendings" ADD CONSTRAINT "spendings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
