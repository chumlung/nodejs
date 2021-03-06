/**
 * Create todos table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('todo', table => {
    table.increments();
    table
      .integer('user_id')
      .references('users.id')
      .onDelete('CASCADE');
    table
      .integer('category_id')
      .references('categories.id')
      .onDelete('CASCADE');
    table.string('details').notNull();
    table.string('priority').notNull();
    table.dateTime('date').notNull();
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
