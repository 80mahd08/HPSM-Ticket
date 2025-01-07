-- CreateTable
CREATE TABLE `Ticket` (
    `idTicket` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `domaine` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `dateConverter` DATETIME(3) NOT NULL,
    `dateFermeture` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idTicket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
