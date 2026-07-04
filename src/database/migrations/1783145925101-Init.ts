import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1783145925101 implements MigrationInterface {
    name = 'Init1783145925101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshTokenHash" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshTokenHash"`);
    }

}
