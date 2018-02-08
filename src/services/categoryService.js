import Boom from 'boom';
import Category from '../models/category';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllCategories(userID) {
  return Category.query({ where: { user_id: userID } })
    .fetchAll({
      withRelated: ['todo']
    })
    .then(categories => {
      return categories;
    });
}

/**
 * Get a category.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getCategory(id) {
  return new Category({ id }).fetch().then(category => {
    if (!category) {
      throw new Boom.notFound('Category not found');
    }

    return category;
  });
}

/**
 * Create new category.
 *
 * @param  {Object}  category
 * @return {Promise}
 */
export function createCategory(category) {
  return new Category({ name: category.name, user_id: category.userID }).save().then(category => category.refresh());
}

/**
 * Update a category.
 *
 * @param  {Number|String}  id
 * @param  {Object}         category
 * @return {Promise}
 */
export function updateCategory(id, category) {
  return new Category({ id }).save({ name: category.name }).then(category => category.refresh());
}

/**
 * Delete a category.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteCategory(id) {
  return new Category({ id }).fetch().then(category => category.destroy());
}
