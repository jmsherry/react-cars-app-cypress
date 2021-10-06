import React from "react";
import CarForm from "./../../components/CarForm/CarForm";
import ErrorBoundary  from "./../../components/ErrorBoundary/ErrorBoundary";
import MainLayout  from '../../layouts/MainLayout';

function AddCar() {
  return (
    <MainLayout>
        <h1 style={{
          marginInlineStart: '15px',
        }}>AddCar</h1>
        <ErrorBoundary>
          <CarForm />
        </ErrorBoundary>
    </MainLayout>
  );
}

export default AddCar;
