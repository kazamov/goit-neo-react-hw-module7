import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectContacts } from '../redux/contactsSlice';
import { selectNameFilter } from '../redux/filtersSlice';

import Contact from './Contact';
import classes from './ContactList.module.css';

function ContactList() {
  const contacts = useSelector(selectContacts);
  const filterValue = useSelector(selectNameFilter);

  const filteredContacts = useMemo(() => {
    if (!filterValue) {
      return null;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase()),
    );
  }, [contacts, filterValue]);

  return (
    <ul className={classes['contact-list']}>
      {(filteredContacts ?? contacts).map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
