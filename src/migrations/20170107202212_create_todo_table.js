/**
 * Create todos table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('todo', table => {
    table.increments();
    table.integer('user_id').references('users.id');
    table.string('details').notNull();
  });
}

/**
 * Drop todo table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('todo');
}
