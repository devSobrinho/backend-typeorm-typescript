import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateTableSpecificationsCar1656679365333
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'specifications_cars',
                columns: [
                    // {
                    //     name: 'id',
                    //     type: 'uuid',
                    // },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'car_id',
                        type: 'uuid',
                    },
                    {
                        name: 'specification_id',
                        type: 'uuid',
                    },
                ],
                // foreignKeys: [
                //     {
                //         name: 'FKCar',
                //         referencedTableName: 'cars',
                //         referencedColumnNames: ['id'],
                //         columnNames: ['car_id'],
                //         onDelete: 'SET NULL',
                //         onUpdate: 'SET NULL',
                //     },
                //     {
                //         name: 'FKSpecification',
                //         referencedTableName: 'specifications',
                //         referencedColumnNames: ['id'],
                //         columnNames: ['specification_id'],
                //         onDelete: 'SET NULL',
                //         onUpdate: 'SET NULL',
                //     },
                // ],
            })
        );

        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'FKSpecificationCar',
                referencedTableName: 'specifications',
                referencedColumnNames: ['id'],
                columnNames: ['specification_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );

        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'FKCarSpecification',
                referencedTableName: 'cars',
                referencedColumnNames: ['id'],
                columnNames: ['car_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'specifications_cars',
            'FKCarSpecification'
        );
        await queryRunner.dropForeignKey(
            'specifications_cars',
            'FKSpecificationCar'
        );
        await queryRunner.dropTable('specifications_cars');
    }
}
