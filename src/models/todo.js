import bookshelf from '../db';
import Tag from '../models/tag';

const TABLE_NAME = 'todo';

/**
 * to-do model.
 */
class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  tags() {
    return this.belongsToMany(Tag);
  }
}

export default Todo;
