/**
 * Create categories table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('categories', table => {
    table.increments();
    table
      .integer('user_id')
      .references('users.id')
      .onDelete('CASCADE');
    table.string('name').notNull();
  });
}

/**
 * Drop categories table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('categories');
}
