import bookshelf from '../db';
import Tag from '../models/tag';
import Category from '../models/category';

const TABLE_NAME = 'todo';

/**
 * to-do model.
 */
class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  category() {
    return this.belongsTo(Category);
  }
  tags() {
    return this.belongsToMany(Tag);
  }
}

export default Todo;
