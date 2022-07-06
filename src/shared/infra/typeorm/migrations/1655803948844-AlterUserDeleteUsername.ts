import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class AlterUserDeleteUsername1655803948844
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'username');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'username',
                type: 'varchar',
            })
        );
    }
}
