import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addContact } from '../redux/actions/contactActions';
import { filterContacts } from '../redux/actions/filterAction';
import { deleteContacts } from '../redux/actions/deleteAction';

import { connect } from 'react-redux';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import headerStyle from '../styles/header-style.module.css';
import '../styles/filterAnimation.css';
import style from '../styles/style.module.css';

class App extends React.Component {
  state = {
    showNotification: false,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    prevProps.contacts !== this.props.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.props.contacts));
  }

  getContact = contact =>
    this.props.contacts.find(elem => elem.name === contact.name)
      ? (this.setState({ showNotification: true }),
        setTimeout(() => {
          this.setState({ showNotification: false });
        }, 2000))
      : this.props.addContact(contact);

  deleteContact = ({ target: { id } }) => {
    this.props.deleteContacts([
      ...this.props.contacts.filter(elem => elem.id !== id),
    ]);
  };

  setFilter = ({ target }) => this.props.filterContacts(target.value);

  render = () => {
    console.log(this.props);
    const { contacts, filter } = this.props;
    const { showNotification } = this.state;

    const filteredContacts = contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase()),
    );

    setTimeout(() => {
      !filteredContacts.length && this.props.filterContacts('');
    }, 1500);

    return (
      <div className={style.main}>
        <CSSTransition
          in={true}
          appear
          timeout={500}
          classNames={headerStyle}
          unmountOnExit
        >
          <h2 className={style.header}>Phonebook</h2>
        </CSSTransition>
        <CSSTransition
          in={showNotification}
          timeout={500}
          classNames="notification"
          unmountOnExit
        >
          <div className={style.existNotification}>
            This name is already exist
          </div>
        </CSSTransition>
        <Form onSubmit={this.getContact} />
        <h2 className={style.header}>Contacts</h2>
        {contacts.length ? (
          <CSSTransition
            in={contacts.length > 1}
            timeout={300}
            classNames="filter"
            unmountOnExit
          >
            <Filter value={filter} onChange={this.setFilter} />
          </CSSTransition>
        ) : (
          <p className={style.noContacts}>No contacts yet...</p>
        )}
        <TransitionGroup component="ul" className={style.list}>
          {filteredContacts.map(elem => (
            <CSSTransition key={elem.id} timeout={250} classNames="form">
              <Contacts contact={elem} onDeleteContact={this.deleteContact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  };
}

const mapStateToProps = state => {
  console.log(state);
  return {
    contacts: state.contacts,
    filter: state.filter,
  };
};

// const mapDispatchToProps = dispatch => ({
//   addContact: contact => dispatch(addContact(contact)),
// });

export default connect(mapStateToProps, {
  addContact,
  filterContacts,
  deleteContacts,
})(App);

// export const App = () => {
//   const [state, setState] = useState({ contacts: [], filter: '' });

//   useEffect(() => {
//     // console.log(state, state);
//     const localContacts = localStorage.getItem('contacts');
//     if (localContacts) {
//       setState({ contacts: JSON.parse(localContacts) });
//     } else {
//       return;
//     }
//   }, []);

//   useEffect(() => {
//     // prevContacts.contacts !== state.contacts &&
//     localStorage.setItem('contacts', JSON.stringify(state.contacts));
//   }, [state.contacts]);

//   // useEffect(() => {
//   //   const contactsLocal = localStorage.getItem('contacts');

//   //   if (contactsLocal) {
//   //     const parsedContacts = JSON.parse(contactsLocal);
//   //     this.setState({ contacts: parsedContacts });
//   //   } else {
//   //     return;
//   //   }

//   // }, [])

//   const getContact = contact =>
//     setState({ ...state, contacts: [...state.contacts, contact] });

//   const deleteContact = ({ target: { id } }) => {
//     setState({
//       ...state,
//       contacts: [...state.contacts.filter(elem => elem.id !== id)],
//     });
//   };

//   const setFilter = ({ target }) =>
//     setState({ ...state, filter: target.value });

//   const filteredContacts = state.contacts.filter(el =>
//     el.name.toLowerCase().includes(state.filter.toLowerCase()),
//   );

//   setTimeout(() => {
//     !filteredContacts.length && setState({ ...state, filter: '' });
//   }, 2000);

//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <Form getContact={getContact} />
//       <h2>Contacts</h2>
//       <Filter value={state.filter} onChange={setFilter} />
//       <ul style={{ marginTop: 40 }}>
//         <Contacts contacts={filteredContacts} onDeleteContact={deleteContact} />
//       </ul>
//     </div>
//   );
// }
