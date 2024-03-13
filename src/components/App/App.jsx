import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getCategories } from '../../features/categories/categoriesSlice';


import styles from './App.module.scss';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AppRoutes from '../Routes/Routes';
import { getProducts } from '../../features/products/productsSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
