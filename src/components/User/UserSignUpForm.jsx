import React, { useState } from 'react';
import styles from './UserSignUpForm.module.scss';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/user/userSlice';

const UserSignUpForm = ({closeForm}) => {
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = ({target: {value, name}}) => {
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).some((val) => val);

    if(!isNotEmpty) return;

    dispatch(createUser(values));
    closeForm();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
          <svg>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
          </svg>
      </div>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input 
            type="email" 
            placeholder='Your email' 
            name="email" 
            value={values.email} 
            autoComplete='off' 
            onChange={handleChange} 
            required
          />
        </div>

        <div className={styles.group}>
          <input 
            type="name" 
            placeholder='Your name' 
            name="name" 
            value={values.name} 
            autoComplete='off' 
            onChange={handleChange} 
            required
          />
        </div>

        <div className={styles.group}>
          <input 
            type="password" 
            placeholder='Your password' 
            name="password" 
            value={values.password} 
            autoComplete='off' 
            onChange={handleChange} 
            required
          />
        </div>

      

        <a href='#' className={styles.link}>
          I already have on account
        </a>

        <button type='submit' className={styles.submitBtn}>
          Create an account
        </button>
      </form>
    </div>
  )
}

export default UserSignUpForm
