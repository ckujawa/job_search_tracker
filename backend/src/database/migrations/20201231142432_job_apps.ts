import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('job_leads', (table) => {
            table.increments('id').primary()

            //set up FK to company
            table.integer('company_id')
                .unsigned()
                .references('id')
                .inTable('persons')
                .onDelete('SET NULL')
                .index()
            
            table.string('role_title', 50)
            table.string('source', 100)
            table.string('url', 100)
            table.date('firstContactDate')
            table.date('lastContactDate')
            table.string('status')
        })
        .createTable('companies', (table) => {
            table.increments('id').primary()

            table.string('name', 40)
            table.string('city', 35)
            table.string('state', 2)
            table.string('zip_code', 11)
            table.string('url', 100)
        })
        .createTable('contacts', (table) => {
            table.increments('id').primary()

            table.string('first_name', 15)
            table.string('last_name', 20)
            table.string('title', 20)
            table.integer('company_id')
                .references('id')
                .inTable('companies')
                .onDelete('CASCADE')
                .index()
        })
}


export async function down(knex: Knex): Promise<void> {
}

