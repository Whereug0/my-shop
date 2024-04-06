import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getCategories } from '../../features/categories/categoriesSlice';


import styles from './App.module.scss';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AppRoutes from '../Routes/Routes';
import { getProducts } from '../../features/products/productsSlice';
import UserForm from '../User/UserForm';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts())
  }, [dispatch])

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.App}>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
      <UserForm />
      <div className={styles.container}>
        <Sidebar isSidebarOpen={isSidebarOpen}/>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;



