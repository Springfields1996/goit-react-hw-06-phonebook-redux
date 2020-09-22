import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
// import { addContact } from '../../redux/actions/contactActions';
import style from '../../styles/style.module.css';

export const Form = props => {
  const [state, setState] = useState({ name: '', number: '' });

  const handleSubmit = evt => {
    evt.preventDefault();
    if (state.name && state.number) {
      props.onSubmit({ id: uuidv4(), ...state });
      setState(state => {
        return { ...state, name: '', number: '' };
      });
    } else {
      alert('Fill all fields!');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setState(state => {
      return { ...state, [name]: value };
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label className={style.formLabel}>
        Name
        <input
          className={style.formInput}
          type="text"
          placeholder="Enter name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
      </label>
      <label className={style.formLabel}>
        Number
        <input
          className={style.formInput2}
          type="text"
          placeholder="Enter number"
          name="number"
          value={state.number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={style.addButton}>
        Add contact
      </button>
    </form>
  );
};

// const mapStateToProps = state => {
//   return { contacts: state.contacts };
// };

// // const mapDispatchToProps = dispatch => ({
// //   addContact: contact => dispatch(addContact(contact)),
// // });

// export default connect(mapStateToProps, { addContact })(Form);
