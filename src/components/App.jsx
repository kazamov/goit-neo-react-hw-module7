import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchContacts } from '../redux/contactsOps';
import { selectError } from '../redux/contactsSlice';

import classes from './App.module.css';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import SearchBox from './SearchBox';

function App() {
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className={classes['app']}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
