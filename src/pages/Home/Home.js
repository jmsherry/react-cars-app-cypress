import React from 'react';
import CarsList from './../../components/CarsList/CarsList';
import MainLayout  from '../../layouts/MainLayout';

function Home(){
  return (
    <MainLayout>
      <CarsList />
    </MainLayout>
  );
}

export default Home;