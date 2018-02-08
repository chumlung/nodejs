import bookshelf from '../db';
import Todo from '../models/todo';

const TABLE_NAME = 'categories';

/**
 * User model.
 */
class Category extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  todo() {
    return this.hasMany(Todo);
  }
}

export default Category;
