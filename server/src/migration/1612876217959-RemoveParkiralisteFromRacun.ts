import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveParkiralisteFromRacun1612876217959 implements MigrationInterface {
    name = 'RemoveParkiralisteFromRacun1612876217959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_aaacc1a4335b9eba414a0b6fc91`");
        await queryRunner.query("ALTER TABLE `racun` DROP COLUMN `parkiralisteId`");
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_700f59735ef30463e39760e2d23`");
        await queryRunner.query("ALTER TABLE `racun` CHANGE `voziloId` `voziloId` int NULL");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_700f59735ef30463e39760e2d23` FOREIGN KEY (`voziloId`) REFERENCES `vozilo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_700f59735ef30463e39760e2d23`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `racun` CHANGE `voziloId` `voziloId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_700f59735ef30463e39760e2d23` FOREIGN KEY (`voziloId`) REFERENCES `vozilo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `racun` ADD `parkiralisteId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_aaacc1a4335b9eba414a0b6fc91` FOREIGN KEY (`parkiralisteId`) REFERENCES `parkiraliste`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
