-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `Users_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserInsurances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `insuranceId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Insurances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `logo` VARCHAR(80) NOT NULL,
    `cost` DECIMAL(65, 30) NOT NULL,
    `capacity` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `Insurances_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InsuranceChains` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `insuranceId` INTEGER NOT NULL,
    `chainId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chains` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `url` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `Chains_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserInsurances` ADD CONSTRAINT `UserInsurances_insuranceId_fkey` FOREIGN KEY (`insuranceId`) REFERENCES `Insurances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInsurances` ADD CONSTRAINT `UserInsurances_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InsuranceChains` ADD CONSTRAINT `InsuranceChains_insuranceId_fkey` FOREIGN KEY (`insuranceId`) REFERENCES `Insurances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InsuranceChains` ADD CONSTRAINT `InsuranceChains_chainId_fkey` FOREIGN KEY (`chainId`) REFERENCES `Chains`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
