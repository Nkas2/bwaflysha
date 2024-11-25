-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `passport` VARCHAR(191) NOT NULL,
    `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Airplane` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL DEFAULT 'ABC-123',
    `image` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Flight` (
    `id` VARCHAR(191) NOT NULL,
    `planeId` VARCHAR(191) NOT NULL,
    `departureDate` DATETIME(3) NOT NULL,
    `departureCity` VARCHAR(191) NOT NULL,
    `departureCityCode` VARCHAR(191) NOT NULL,
    `arrivalDate` DATETIME(3) NOT NULL,
    `destinationCity` DATETIME(3) NOT NULL,
    `destinationCityCode` VARCHAR(191) NOT NULL,
    `price` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FlightSeat` (
    `id` VARCHAR(191) NOT NULL,
    `flightId` VARCHAR(191) NOT NULL,
    `seatNumber` INTEGER NOT NULL,
    `isBooked` BOOLEAN NULL DEFAULT false,
    `type` ENUM('ECONOMY', 'BUSINESS', 'FIRST') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` VARCHAR(191) NOT NULL,
    `code` INTEGER NOT NULL,
    `flightId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `flightSeatId` VARCHAR(191) NOT NULL,
    `bookingDate` DATETIME(3) NOT NULL,
    `price` BIGINT NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL,
    `tokenMidtrans` VARCHAR(191) NULL,

    UNIQUE INDEX `Ticket_code_key`(`code`),
    UNIQUE INDEX `Ticket_flightSeatId_key`(`flightSeatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_planeId_fkey` FOREIGN KEY (`planeId`) REFERENCES `Airplane`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FlightSeat` ADD CONSTRAINT `FlightSeat_flightId_fkey` FOREIGN KEY (`flightId`) REFERENCES `Flight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_flightId_fkey` FOREIGN KEY (`flightId`) REFERENCES `Flight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_flightSeatId_fkey` FOREIGN KEY (`flightSeatId`) REFERENCES `FlightSeat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
