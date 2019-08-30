import uuid from 'uuid/v4';
import { CREATE_EVENT, DELETE_EVENT, DELETE_ALL_EVENTS } from '../actions';

export default (events = [], action) => {
  switch (action.type) {
    case CREATE_EVENT:
      const { title, body } = action.payload;
      return [...events, { id: uuid(), created_at: Date.now(), title, body }];
    case DELETE_EVENT:
      const { id } = action.payload;
      return events.filter(event => event.id !== id);
    case DELETE_ALL_EVENTS:
      return [];
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
};
