import keysNames from '../keysNames';
import keySelector from '../../utils/selectors/keySelector';

const store = s => s[keysNames.users];

export default {
  store,
  ...keySelector(store, ['you', 'contact'])
};
