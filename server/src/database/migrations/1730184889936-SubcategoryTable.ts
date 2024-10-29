import { MigrationInterface, QueryRunner } from "typeorm";

export class SubcategoryTable1730184889936 implements MigrationInterface {
    name = 'SubcategoryTable1730184889936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subcategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "categoryId" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "image" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_5ad0b82340b411f9463c8e9554d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_accfb3da1d9f29dbda6c7554b2" ON "subcategory" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5da14bc2c75b3f8bb8271a26d" ON "subcategory" ("description") `);
        await queryRunner.query(`ALTER TABLE "category" ADD "description" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_7b7115fda47b20b277b8ca6f89" ON "category" ("description") `);
        await queryRunner.query(`ALTER TABLE "subcategory" ADD CONSTRAINT "FK_3fc84b9483bdd736f728dbf95b2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategory" DROP CONSTRAINT "FK_3fc84b9483bdd736f728dbf95b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b7115fda47b20b277b8ca6f89"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5da14bc2c75b3f8bb8271a26d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_accfb3da1d9f29dbda6c7554b2"`);
        await queryRunner.query(`DROP TABLE "subcategory"`);
    }

}
