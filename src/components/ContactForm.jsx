import { useCallback, useId } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { addContact } from '../redux/contactsSlice';

import classes from './ContactForm.module.css';

const initialValues = {
  name: '',
  number: '',
};
const phoneRegExp = /^\d{3}-\d{2}-\d{2}$/;

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Too short name').max(50, 'Too long name'),
  number: Yup.string()
    .required('Number is required')
    .matches(phoneRegExp, 'Phone number is not valid, use format 777-77-77'),
});

function ContactForm() {
  const nameId = useId();
  const numberId = useId();
  const dispatch = useDispatch();

  const handleFormSubmit = useCallback(
    ({ name, number }) => {
      dispatch(addContact(name, number));
    },
    [dispatch],
  );

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { resetForm }) => {
        handleFormSubmit(values);
        resetForm();
      }}
      validationSchema={ContactSchema}
    >
      <Form className={classes['contact-form']}>
        <label htmlFor={nameId}>Name</label>
        <Field type="text" name="name" id={nameId} />
        <ErrorMessage className={classes['error-message']} name="name" component="span" />

        <label htmlFor={numberId}>Number</label>
        <Field type="tel" name="number" id={numberId} />
        <ErrorMessage className={classes['error-message']} name="number" component="span" />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
