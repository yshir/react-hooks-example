import React, { useState, useReducer } from 'react';
import '../node_modules/bulma/css/bulma.css';

import { CREATE_EVENT, DELETE_EVENT, DELETE_ALL_EVENTS } from './actions';
import reducer from './reducers';

export default () => {
  const initialState = { title: '', body: '' };
  const [state, setState] = useState(initialState);
  const { title, body } = state;

  const [events, dispatch] = useReducer(reducer, []);

  const onSubmitHandler = () => {
    dispatch({ type: CREATE_EVENT, payload: { title, body } });
    setState(initialState);
  };

  const onDeleteHandler = id => {
    dispatch({ type: DELETE_EVENT, payload: { id } });
  };

  const onDeleteAllHandler = () => {
    dispatch({ type: DELETE_ALL_EVENTS });
  };

  const disabledSubmit = () => !title || !body;

  return (
    <div className="container">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">イベント作成アプリケーション</h1>
            <h2 className="subtitle">with React hooks</h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="title">Create New Event</h2>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter a title"
                value={title}
                onChange={e => setState({ ...state, title: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Body</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter a body"
                value={body}
                onChange={e => setState({ ...state, body: e.target.value })}
              />
            </div>
          </div>
          <div className="control">
            <button
              className="button is-primary"
              disabled={disabledSubmit()}
              onClick={onSubmitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
      {/* <pre>{JSON.stringify(state, null, 4)}</pre> */}
      <section className="section">
        <div className="container">
          <h2 className="title">Event List</h2>
          {!!events.length && (
            <div>
              <button className="button is-danger" onClick={onDeleteAllHandler}>
                Delete all
              </button>
            </div>
          )}
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>Created at</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <th>{event.id}</th>
                  <td>{event.title}</td>
                  <td>{event.body}</td>
                  <td>{event.created_at}</td>
                  <td>
                    <button
                      className="button is-danger is-rounded is-small"
                      onClick={() => onDeleteHandler(event.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
