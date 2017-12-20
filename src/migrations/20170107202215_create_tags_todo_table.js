/**
 * Create tags table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tags_todo', table => {
    table.integer('tag_id').references('tags.id');
    table.integer('todo_id').references('todo.id');
  });
}

/**
 * Drop tags table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tags_todo');
}
