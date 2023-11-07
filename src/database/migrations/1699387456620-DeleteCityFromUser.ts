import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteCityFromUser1699387456620 implements MigrationInterface {
  name = 'DeleteCityFromUser1699387456620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "city"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "city" text NOT NULL`);
  }
}
