import classes from './App.module.css';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import SearchBox from './SearchBox';

function App() {
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
