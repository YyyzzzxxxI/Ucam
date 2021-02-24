import {MigrationInterface, QueryRunner} from "typeorm";

export class EntityNameMigration1614171872835 implements MigrationInterface {
    name = 'EntityNameMigration1614171872835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
