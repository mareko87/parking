import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateParkiralisteAndBoravak1612874623696 implements MigrationInterface {
    name = 'CreateParkiralisteAndBoravak1612874623696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `parkiraliste` (`id` int NOT NULL AUTO_INCREMENT, `naziv` varchar(255) NOT NULL, `adresa` varchar(255) NOT NULL, `kapacitet` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `boravak` (`vremeUlaska` datetime NOT NULL, `vremeIzlaska` datetime NOT NULL, `parkiralisteId` int NOT NULL, `voziloId` int NOT NULL, PRIMARY KEY (`parkiralisteId`, `voziloId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `boravak` ADD CONSTRAINT `FK_8fe5c50811c63d03e060b53eee0` FOREIGN KEY (`parkiralisteId`) REFERENCES `parkiraliste`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `boravak` ADD CONSTRAINT `FK_f0f1a9fc5ea3ecbba2556edbcd1` FOREIGN KEY (`voziloId`) REFERENCES `vozilo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `boravak` DROP FOREIGN KEY `FK_f0f1a9fc5ea3ecbba2556edbcd1`");
        await queryRunner.query("ALTER TABLE `boravak` DROP FOREIGN KEY `FK_8fe5c50811c63d03e060b53eee0`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP TABLE `boravak`");
        await queryRunner.query("DROP TABLE `parkiraliste`");
    }

}
