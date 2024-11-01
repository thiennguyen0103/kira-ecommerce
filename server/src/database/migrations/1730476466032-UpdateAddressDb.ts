import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddressDb1730476466032 implements MigrationInterface {
    name = 'UpdateAddressDb1730476466032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_4ba9d467035249d35073b26c034"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d45874edcd8a34b67faa1a62df1"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_40ad83baca50795a055230d49c3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_3624b3085165071df70276a4000"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "wardCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "districtCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "provinceCode" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "cityId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_4ba9d467035249d35073b26c034" FOREIGN KEY ("wardCode") REFERENCES "ward"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d45874edcd8a34b67faa1a62df1" FOREIGN KEY ("districtCode") REFERENCES "district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_40ad83baca50795a055230d49c3" FOREIGN KEY ("provinceCode") REFERENCES "province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_3624b3085165071df70276a4000" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_3624b3085165071df70276a4000"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_40ad83baca50795a055230d49c3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d45874edcd8a34b67faa1a62df1"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_4ba9d467035249d35073b26c034"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "cityId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "provinceCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "districtCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "wardCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_3624b3085165071df70276a4000" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_40ad83baca50795a055230d49c3" FOREIGN KEY ("provinceCode") REFERENCES "province"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d45874edcd8a34b67faa1a62df1" FOREIGN KEY ("districtCode") REFERENCES "district"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_4ba9d467035249d35073b26c034" FOREIGN KEY ("wardCode") REFERENCES "ward"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
