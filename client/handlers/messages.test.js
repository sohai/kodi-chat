import messagesHandler from './messages';

const item = {
  message: 'test',
  username: 'username'
};

describe('(handler) messages', () => {
  it('have right stucture', () => {
    expect(messagesHandler).toMatchSnapshot();
  });

  describe('actions crators corect objects', () => {
    const { actions } = messagesHandler;
    it('actions.addMessage', () => {
      expect(actions.addMessage()).toMatchSnapshot();
    });
    it('actions.incMessage', () => {
      expect(actions.incMessage()).toMatchSnapshot();
    });
    it('actions.removeUserLastMessage', () => {
      expect(actions.removeUserLastMessage()).toMatchSnapshot();
    });
  });

  describe('reducers handle actions', () => {
    const {
      actions: { addMessage, incMessage, removeUserLastMessage },
      reducer
    } = messagesHandler;
    let state = reducer(undefined, {});

    it('actions.addMessage', () => {
      expect(reducer(state, addMessage(item))).toMatchSnapshot();
    });
    it('actions.incMessage', () => {
      let state = reducer(undefined, {});
      expect(reducer(state, incMessage(item))).toMatchSnapshot();
    });
    it('actions.removeUserLastMessage', () => {
      let state = reducer(undefined, {});
      expect(reducer(state, addMessage(item))).toMatchSnapshot();
      expect(
        reducer(state, removeUserLastMessage(item.username))
      ).toMatchSnapshot();
    });
  });
});
