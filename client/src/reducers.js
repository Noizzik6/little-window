import { combineReducers } from 'redux';
import { ADD_USER_INPUT, ADD_BOT_MESSAGE } from './actions';

// Need to make this idea based
const initialState = {
  messages: [],
};

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_USER_INPUT:
    console.log(action)
      // TODO: Add this to the existing state and make it have the required additional information also
      return [
        ...state,
        {text: action.text, type: 'userMessage'},
      ];
    case ADD_BOT_MESSAGE:
      console.log("ADDING MESSAGE")
      console.log(action)
      // TODO: Add this to the existing state and make it have the required additional information also
      return [
        ...state,
        {text: action.data.speech, options: action.data.options, type: 'botMessage'},
      ];
    default:
      return state;
  }
};

const littleWindowApp = combineReducers({
  messages,
});

export default littleWindowApp;
