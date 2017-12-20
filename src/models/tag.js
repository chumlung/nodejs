import bookshelf from '../db';
import Todo from '../models/todo';

const TABLE_NAME = 'tags';

/**
 * to-do model.
 */
class Tag extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  todo() {
    return this.belongsToMany(Todo);
  }
}

export default Tag;
