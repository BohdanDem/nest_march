import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1699469514099 implements MigrationInterface {
  name = ' $npmConfigName1699469514099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "avatar" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
