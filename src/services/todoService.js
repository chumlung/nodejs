/* eslint-disable prettier/prettier */
import Boom from 'boom';
import Todo from '../models/todo';

/**
 * Get all to-dolists
 *
 * @return {Promise}
 */
export function getAllTodos(userID) {
  return Todo.query({ where: { user_id: userID } }).fetchAll({
    withRelated:(['tags'])}
  ).then((todos)=>{
    return todos;
  });
}

/**
 * Get a list-item
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodo(id) {
  return new Todo({ id }).fetch().then(todo => {
    if (!todo) {
      throw new Boom.notFound('Todo not found');
    }

    return todo;
  });
}

export function getSearchedTodo(userId, searchValue, page) {
  return Todo.query((qb)=> {
    qb.where('user_id','=',userId).andWhere('details','LIKE','%' + searchValue + '%');
  }).fetchPage({
    pageSize: 5,
    page: page
  });
}

/**
 * Create new todo.
 *
 * @param  {Object}  todo
 * @return {Promise}
 */
export function createTodo(todo) {
  return new Todo({ userID: todo.userID, details: todo.details }).save().then(result => {
    result.tags().attach(todo.tags);
    result.refresh();
  })
}

/**
 * Update a todo.
 *
 * @param  {Number|String}  id
 * @param  {Object}         todo
 * @return {Promise}
 */
export function updateTodo(id, todo) {
  return new Todo({ id }).save({ details: todo.details }).then(todo => todo.refresh());
}

/**
 * Delete a todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id) {
  return new Todo({ id }).fetch().then(todo => todo.destroy());
}
