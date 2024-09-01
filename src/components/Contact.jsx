import { useDispatch } from 'react-redux';
import { FaUser, FaPhoneAlt } from 'react-icons/fa';
import clsx from 'clsx';

import { deleteContact } from '../redux/contactsOps';

import classes from './Contact.module.css';

function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleContactDelete = () => {
    dispatch(deleteContact(contact));
  };

  return (
    <div
      className={clsx(classes['contact'], {
        [classes['optimistic']]: contact.id === null,
      })}
    >
      <div className={classes['contact-info']}>
        <FaUser />
        <span className={classes['contact-name']}>{contact.name}</span>
        <FaPhoneAlt />
        <span className={classes['contact-number']}>{contact.number}</span>
      </div>
      <button
        disabled={contact.id === null}
        onClick={handleContactDelete}
        className={classes['delete-button']}
        type="button"
      >
        Delete
      </button>
    </div>
  );
}

export default Contact;
