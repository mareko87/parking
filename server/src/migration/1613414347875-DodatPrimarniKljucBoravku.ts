import {MigrationInterface, QueryRunner} from "typeorm";

export class DodatPrimarniKljucBoravku1613414347875 implements MigrationInterface {
    name = 'DodatPrimarniKljucBoravku1613414347875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `boravak` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `boravak` ADD PRIMARY KEY (`vremeUlaska`, `parkiralisteId`, `voziloId`)");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_6482c92379316c5ff01c2b974e2`");
        await queryRunner.query("ALTER TABLE `racun` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `boravak` DROP FOREIGN KEY `FK_161ff9a0518eb20612cb3e47387`");
        await queryRunner.query("ALTER TABLE `boravak` CHANGE `vremeIzlaska` `vremeIzlaska` datetime NULL");
        await queryRunner.query("ALTER TABLE `boravak` CHANGE `racunId` `racunId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_6482c92379316c5ff01c2b974e2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `boravak` ADD CONSTRAINT `FK_161ff9a0518eb20612cb3e47387` FOREIGN KEY (`racunId`) REFERENCES `racun`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `boravak` DROP FOREIGN KEY `FK_161ff9a0518eb20612cb3e47387`");
        await queryRunner.query("ALTER TABLE `racun` DROP FOREIGN KEY `FK_6482c92379316c5ff01c2b974e2`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `boravak` CHANGE `racunId` `racunId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `boravak` CHANGE `vremeIzlaska` `vremeIzlaska` datetime NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `boravak` ADD CONSTRAINT `FK_161ff9a0518eb20612cb3e47387` FOREIGN KEY (`racunId`) REFERENCES `racun`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `racun` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `racun` ADD CONSTRAINT `FK_6482c92379316c5ff01c2b974e2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `boravak` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `boravak` ADD PRIMARY KEY (`parkiralisteId`, `voziloId`)");
    }

}
