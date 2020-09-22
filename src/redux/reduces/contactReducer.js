import { ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACTS } from '../types';

const initialState = {
  contacts: [],
  filter: '',
};

export const reducer = (state = { ...initialState }, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, payload] };

    case FILTER_CONTACTS:
      return { ...state, filter: payload };

    case DELETE_CONTACT:
      return { ...state, contacts: payload };

    default:
      return state;
  }
};
