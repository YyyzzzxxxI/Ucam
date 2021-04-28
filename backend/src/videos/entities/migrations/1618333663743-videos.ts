import {MigrationInterface, QueryRunner} from "typeorm";

export class videos1618333663743 implements MigrationInterface {
    name = 'videos1618333663743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "video_name" character varying NOT NULL, CONSTRAINT "UQ_3224c4b085150d37c9cb075c4d4" UNIQUE ("video_name"), CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "videos"`);
    }

}
