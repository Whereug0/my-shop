import React, {useState, useEffect} from 'react';
import styles from './Profile.module.scss';

import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../features/user/userSlice";


const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };


  return (
    <div className={styles.profileWrapper}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <img src={values.avatar} alt="avatar" className={styles.avatar}/>
          <div className={styles.inputs}>
            <div className={styles.group}>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                value={values.email}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="name"
                placeholder="Your name"
                name="name"
                value={values.name}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="password"
                placeholder="Your password"
                name="password"
                value={values.password}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="avatar"
                placeholder="Your avatar"
                name="avatar"
                value={values.avatar}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submit}>
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Profile
