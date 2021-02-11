import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnPlacenToBoravak1612877429211 implements MigrationInterface {
    name = 'AddColumnPlacenToBoravak1612877429211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `boravak` ADD `placen` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `boravak` CHANGE `vremeIzlaska` `vremeIzlaska` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_700f59735ef30463e39760e2d23`");
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_6482c92379316c5ff01c2b974e2`");
        await queryRunner.query("ALTER TABLE `racun` CHANGE `voziloId` `voziloId` int NULL");
        await queryRunner.query("ALTER TABLE `racun` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_700f59735ef30463e39760e2d23` FOREIGN KEY (`voziloId`) REFERENCES `vozilo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_6482c92379316c5ff01c2b974e2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_6482c92379316c5ff01c2b974e2`");
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_700f59735ef30463e39760e2d23`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `racun` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `racun` CHANGE `voziloId` `voziloId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_6482c92379316c5ff01c2b974e2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_700f59735ef30463e39760e2d23` FOREIGN KEY (`voziloId`) REFERENCES `vozilo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `boravak` CHANGE `vremeIzlaska` `vremeIzlaska` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `boravak` DROP COLUMN `placen`");
    }

}
