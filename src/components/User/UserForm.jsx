import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserSignUpForm from './UserSignUpForm';
import styles from './UserForm.module.scss';
import { toggleForm, toggleFormType } from '../../features/user/userSlice';
import UserLogInForm from './UserLogInForm';


const UserForm = () => {
  const dispatch = useDispatch();

  const {showForm, formType} = useSelector(({user}) => user);

  const closeForm = () => dispatch(toggleForm(false));
  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));


  

  return showForm ? (
    <div className={styles.UseForm}>
      <div className={styles.overlay} onClick={closeForm}/>
      {formType === "login" ? (
        <UserLogInForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm}/> 
      ):(
        <UserSignUpForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm}/>
      )}
      </div>
    ) : (
      <></>
    );
}

export default UserForm;
