import {MigrationInterface, QueryRunner} from "typeorm";

export class ADDStatusToUser1612874191954 implements MigrationInterface {
    name = 'ADDStatusToUser1612874191954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `odobren` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_4dd13cf5536c5ec906dba37cbef`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `categoryId` `categoryId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_4dd13cf5536c5ec906dba37cbef` FOREIGN KEY (`categoryId`) REFERENCES `user_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `odobren`");
    }

}
