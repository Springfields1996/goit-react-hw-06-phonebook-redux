import { DELETE_CONTACT } from '../types';

export const deleteContacts = contacts => ({
  type: DELETE_CONTACT,
  payload: contacts,
});
