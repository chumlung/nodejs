/**
 * Created by Chumlung on 12/14/2017.
 */
const TABLE_NAME = 'tags';
/**
 * Seed Tags table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex(TABLE_NAME).insert({
          tag: 'Learn'
        }),
        knex(TABLE_NAME).insert({
          tag: 'Work'
        }),
        knex(TABLE_NAME).insert({
          tag: 'Movie'
        }),
        knex(TABLE_NAME).insert({
          tag: 'Games'
        }),
        knex(TABLE_NAME).insert({
          tag: 'Gadgets'
        }),
        knex(TABLE_NAME).insert({
          tag: 'Food'
        }),
        knex(TABLE_NAME).insert({
          tag: 'Search'
        })
      ]);
    });
}
