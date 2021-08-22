import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateOs1628995297643 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'os',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'clientIDFK',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'technicianIDFK',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'secretaryIDFK',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'serviceIDFK',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'obsTechnician',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'obsSecretary',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'statusIDFK',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'isClosed',
                        type: 'boolean',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'startedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'finishedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'os',
            new TableForeignKey({
                name: 'clientIDFK',
                columnNames: ['clientIDFK'],
                referencedColumnNames: ['id'],
                referencedTableName: 'client',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'os',
            new TableForeignKey({
                name: 'technicianIDFK',
                columnNames: ['technicianIDFK'],
                referencedColumnNames: ['id'],
                referencedTableName: 'technician',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'os',
            new TableForeignKey({
                name: 'secretaryIDFK',
                columnNames: ['secretaryIDFK'],
                referencedColumnNames: ['id'],
                referencedTableName: 'secretary',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'os',
            new TableForeignKey({
                name: 'serviceIDFK',
                columnNames: ['serviceIDFK'],
                referencedColumnNames: ['id'],
                referencedTableName: 'service',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'os',
            new TableForeignKey({
                name: 'statusIDFK',
                columnNames: ['statusIDFK'],
                referencedColumnNames: ['id'],
                referencedTableName: 'status',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('os', 'clientIDFK');
        await queryRunner.dropForeignKey('os', 'technicianIDFK');
        await queryRunner.dropForeignKey('os', 'secretaryIDFK');
        await queryRunner.dropForeignKey('os', 'serviceIDFK');
        await queryRunner.dropForeignKey('os', 'statusIDFK');
        await queryRunner.dropTable('os');
    }
}
