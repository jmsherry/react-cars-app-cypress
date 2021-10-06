import React, { useContext } from "react";
import { useParams, useHistory} from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import CarForm from "./../../components/CarForm/CarForm";
import { CarsContext } from "./../../contexts/CarsContext";
import ErrorBoundary from "./../../components/ErrorBoundary/ErrorBoundary";
import MainLayout from "../../layouts/MainLayout";

import "./UpdateCar.css";

function UpdateCar() {
  let { id } = useParams();
  let history = useHistory();
  const { cars } = useContext(CarsContext);
  const { addToast } = useToasts();
  const carToBeUpdated = cars.find(({ _id }) => _id === id);

  if (!carToBeUpdated) {
    addToast(`Error: cannot find car with id ${id}. Redirecting...`, {
      appearance: "error",
    });
    history.push("/");
    return null;
  }

  return (
    <MainLayout>
      <h1>Update Car</h1>
      <ErrorBoundary>
        <CarForm car={carToBeUpdated} />
      </ErrorBoundary>
    </MainLayout>
  );
}

export default UpdateCar;
