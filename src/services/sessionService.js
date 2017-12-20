import Boom from 'boom';
import Session from '../models/session';

/**
 * Get all sessions.
 *
 * @return {Promise}
 */
export function getAllSessions() {
  return Session.fetchAll();
}

/**
 * Get a session.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getSession(userId) {
  return new Session()
    .query({ where: { user_id: userId } })
    .fetch()
    .then(session => {
      if (!session) {
        throw new Boom.notFound('Session not found');
      }

      return session;
    });
}

export function createSession(userId, rToken) {
  return new Session({ user_id: userId, refresh_token: rToken }).save().then(session => session.refresh());
}

/**
 * Update a session.
 *
 * @param  {Number|String}  id
 * @param  {Object}         session
 * @return {Promise}
 */
export function updateSession(id, session) {
  return new Session({ id }).save({ name: session.name }).then(session => session.refresh());
}

/**
 * Delete a session.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteSession(userId) {
  return new Session({ userId }).fetch().then(session => session.destroy());
}
export default Session;
