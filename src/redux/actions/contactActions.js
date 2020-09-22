import { ADD_CONTACT } from '../types';

export const addContact = contact => {
  return {
    type: ADD_CONTACT,
    payload: contact,
  };
};
