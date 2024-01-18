import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1705538971791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            length: '36', // Change to varchar(36)
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'UUID()', // Change to UUID() for MySQL
          },
          {
            name: 'username',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          // Add other columns as needed
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
