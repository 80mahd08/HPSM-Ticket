-- CreateTable
CREATE TABLE `Ticket` (
    `idTicket` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `pending` BOOLEAN NULL DEFAULT false,
    `commentaire` VARCHAR(191) NULL,
    `dateOuverture` DATETIME(3) NULL,
    `dateFermeture` DATETIME(3) NULL,

    PRIMARY KEY (`idTicket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
