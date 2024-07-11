import React from 'react';
import TareaForm from '../components/TareaForm';
import ListaTareas from '../components/ListaTareas';

const Home = () => {
  return (
    <div className="container">
      <TareaForm />
      <hr />
      <ListaTareas />
    </div>
  );
};

export default Home;
