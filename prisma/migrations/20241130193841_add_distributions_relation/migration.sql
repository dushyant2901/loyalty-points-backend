-- CreateTable
CREATE TABLE "LoyaltyPointsDistribution" (
    "id" SERIAL NOT NULL,
    "loyaltyPointId" INTEGER NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "distributedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoyaltyPointsDistribution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoyaltyPointsDistribution" ADD CONSTRAINT "LoyaltyPointsDistribution_loyaltyPointId_fkey" FOREIGN KEY ("loyaltyPointId") REFERENCES "LoyaltyPoints"("loyaltyPointId") ON DELETE RESTRICT ON UPDATE CASCADE;
