const { FILTER_CONTACTS } = require('../types');

export const filterContacts = filter => ({
  type: FILTER_CONTACTS,
  payload: filter,
});
