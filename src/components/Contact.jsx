import { useDispatch } from 'react-redux';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';

import { deleteContact } from '../redux/contactsSlice';

import classes from './Contact.module.css';
import { useCallback } from 'react';

function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleContactDelete = useCallback(
    ({ id }) => {
      dispatch(deleteContact(id));
    },
    [dispatch],
  );

  return (
    <div className={classes['contact']}>
      <div className={classes['contact-info']}>
        <FaUser />
        <span className={classes['contact-name']}>{contact.name}</span>
        <FaPhoneAlt />
        <span className={classes['contact-number']}>{contact.number}</span>
      </div>
      <button onClick={handleContactDelete} className={classes['delete-button']} type="button">
        Delete
      </button>
    </div>
  );
}

export default Contact;
