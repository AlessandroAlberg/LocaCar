import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('vehicles', table => {
        table.increments('id').primary();
        table.string('board', 7).notNullable();
        table.string('chassi', 17).notNullable();
        table.string('renavam', 11).notNullable();
        table.string('model').notNullable();
        table.string('brand').notNullable();
        table.string('year', 4).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('vehicles');
}