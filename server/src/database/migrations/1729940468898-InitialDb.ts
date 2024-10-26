import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDb1729940468898 implements MigrationInterface {
    name = 'InitialDb1729940468898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "image" character varying, "isActive" boolean NOT NULL DEFAULT true, "roleId" uuid NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "image" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "image" character varying NOT NULL, "slug" character varying NOT NULL, "price" integer NOT NULL, "rating" integer NOT NULL DEFAULT '0', "isDelete" boolean NOT NULL DEFAULT false, "categoryId" uuid, "sellerId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22cc43e9a74d7498546e9a63e7" ON "product" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_29a733971f71626611bb3808eb" ON "product" ("description") `);
        await queryRunner.query(`CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" uuid NOT NULL, "userId" uuid NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_d5cac481d22dacaf4d53f900a3f" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_151a9caa39c543d966c13fb8dae" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_151a9caa39c543d966c13fb8dae"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d5cac481d22dacaf4d53f900a3f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29a733971f71626611bb3808eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22cc43e9a74d7498546e9a63e7"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23c05c292c439d77b0de816b50"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
