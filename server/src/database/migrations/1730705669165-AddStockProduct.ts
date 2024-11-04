import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockProduct1730705669165 implements MigrationInterface {
    name = 'AddStockProduct1730705669165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "stock" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stock"`);
    }

}
