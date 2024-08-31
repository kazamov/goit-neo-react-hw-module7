import { useSelector } from 'react-redux';

import { selectFilteredContacts, selectError, selectLoading } from '../redux/contactsSlice';

import Contact from './Contact';
import classes from './ContactList.module.css';

function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading && !error) {
    return <p>Loading...</p>;
  }

  return (
    <ul className={classes['contact-list']}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
