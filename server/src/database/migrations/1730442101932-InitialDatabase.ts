import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1730442101932 implements MigrationInterface {
    name = 'InitialDatabase1730442101932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nameEn" character varying NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "nameEn" character varying NOT NULL, "codeName" character varying NOT NULL, "codeNameEn" character varying NOT NULL, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unit" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "fullNameEn" character varying NOT NULL, "shortName" character varying NOT NULL, "shortNameEn" character varying NOT NULL, "codeName" character varying NOT NULL, "codeNameEn" character varying NOT NULL, CONSTRAINT "PK_4252c4be609041e559f0c80f58a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "province" ("code" character varying NOT NULL, "name" character varying NOT NULL, "nameEn" character varying NOT NULL, "fullName" character varying NOT NULL, "fullNameEn" character varying NOT NULL, "codeName" character varying NOT NULL, "unitId" integer, "regionId" integer, "cityId" integer, CONSTRAINT "PK_3288dfa18d390ed33b359fc0418" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "district" ("code" character varying NOT NULL, "name" character varying NOT NULL, "nameEn" character varying NOT NULL, "fullName" character varying NOT NULL, "fullNameEn" character varying NOT NULL, "codeName" character varying NOT NULL, "provinceCode" character varying NOT NULL, "unitId" integer, CONSTRAINT "PK_fbfe5cb0d22c2be8c9a9fff5b6b" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "ward" ("code" character varying NOT NULL, "name" character varying NOT NULL, "nameEn" character varying NOT NULL, "fullName" character varying NOT NULL, "fullNameEn" character varying NOT NULL, "codeName" character varying NOT NULL, "districtCode" character varying NOT NULL, "provinceCode" character varying, "unitId" integer, CONSTRAINT "PK_14bd787455693efede59d248a7d" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "image" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23c05c292c439d77b0de816b50" ON "category" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_7b7115fda47b20b277b8ca6f89" ON "category" ("description") `);
        await queryRunner.query(`CREATE TABLE "subcategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "categoryId" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "image" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "PK_5ad0b82340b411f9463c8e9554d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_accfb3da1d9f29dbda6c7554b2" ON "subcategory" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5da14bc2c75b3f8bb8271a26d" ON "subcategory" ("description") `);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "addressLine" character varying NOT NULL, "userId" uuid NOT NULL, "isDefault" boolean NOT NULL, "wardCode" character varying, "districtCode" character varying, "provinceCode" character varying, "cityId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "image" character varying, "isActive" boolean NOT NULL DEFAULT true, "roleId" uuid NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "image" character varying NOT NULL, "slug" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "rating" integer NOT NULL DEFAULT '0', "subcategoryId" uuid NOT NULL, "isDelete" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22cc43e9a74d7498546e9a63e7" ON "product" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_29a733971f71626611bb3808eb" ON "product" ("description") `);
        await queryRunner.query(`CREATE TABLE "orderItem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "orderId" uuid, "productId" uuid, CONSTRAINT "PK_fe5c4758e5f47a681deb1065c92" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "totalAmount" numeric(10,2) NOT NULL, "status" character varying NOT NULL DEFAULT 'Pending', "userId" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "productId" uuid NOT NULL, "userId" uuid NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "province" ADD CONSTRAINT "FK_0c33621ba5e9b5900aa037823ee" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "province" ADD CONSTRAINT "FK_9dfaa9f35004d0c405dd66394d1" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "province" ADD CONSTRAINT "FK_fd2d0f8ee99bca15caf2ea9b31e" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_713f1d836d636d54c7c399a14dc" FOREIGN KEY ("provinceCode") REFERENCES "province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "district" ADD CONSTRAINT "FK_97d093007f145d34cdfe90f395c" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_04ceb61539725eca726fb60a94d" FOREIGN KEY ("provinceCode") REFERENCES "district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ward" ADD CONSTRAINT "FK_f63083953446537f6af47b3388e" FOREIGN KEY ("unitId") REFERENCES "unit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcategory" ADD CONSTRAINT "FK_3fc84b9483bdd736f728dbf95b2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_4ba9d467035249d35073b26c034" FOREIGN KEY ("wardCode") REFERENCES "ward"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d45874edcd8a34b67faa1a62df1" FOREIGN KEY ("districtCode") REFERENCES "district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_40ad83baca50795a055230d49c3" FOREIGN KEY ("provinceCode") REFERENCES "province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_3624b3085165071df70276a4000" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_904b30d0611df66f73164e999db" FOREIGN KEY ("subcategoryId") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderItem" ADD CONSTRAINT "FK_ef8ed42ef2c6feafd1447d96279" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderItem" ADD CONSTRAINT "FK_aa1c5296e561dbd599ed0f0e860" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_371eb56ecc4104c2644711fa85f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_371eb56ecc4104c2644711fa85f"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "orderItem" DROP CONSTRAINT "FK_aa1c5296e561dbd599ed0f0e860"`);
        await queryRunner.query(`ALTER TABLE "orderItem" DROP CONSTRAINT "FK_ef8ed42ef2c6feafd1447d96279"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_904b30d0611df66f73164e999db"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_3624b3085165071df70276a4000"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_40ad83baca50795a055230d49c3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d45874edcd8a34b67faa1a62df1"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_4ba9d467035249d35073b26c034"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "subcategory" DROP CONSTRAINT "FK_3fc84b9483bdd736f728dbf95b2"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_f63083953446537f6af47b3388e"`);
        await queryRunner.query(`ALTER TABLE "ward" DROP CONSTRAINT "FK_04ceb61539725eca726fb60a94d"`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_97d093007f145d34cdfe90f395c"`);
        await queryRunner.query(`ALTER TABLE "district" DROP CONSTRAINT "FK_713f1d836d636d54c7c399a14dc"`);
        await queryRunner.query(`ALTER TABLE "province" DROP CONSTRAINT "FK_fd2d0f8ee99bca15caf2ea9b31e"`);
        await queryRunner.query(`ALTER TABLE "province" DROP CONSTRAINT "FK_9dfaa9f35004d0c405dd66394d1"`);
        await queryRunner.query(`ALTER TABLE "province" DROP CONSTRAINT "FK_0c33621ba5e9b5900aa037823ee"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "orderItem"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29a733971f71626611bb3808eb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22cc43e9a74d7498546e9a63e7"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5da14bc2c75b3f8bb8271a26d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_accfb3da1d9f29dbda6c7554b2"`);
        await queryRunner.query(`DROP TABLE "subcategory"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b7115fda47b20b277b8ca6f89"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23c05c292c439d77b0de816b50"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "ward"`);
        await queryRunner.query(`DROP TABLE "district"`);
        await queryRunner.query(`DROP TABLE "province"`);
        await queryRunner.query(`DROP TABLE "unit"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
