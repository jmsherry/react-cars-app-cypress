import React, { createContext, useState, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex

export const CarsContext = createContext({
  fetchCars: () => [],
  addCar: () => {},
  updateCar: () => {},
  deleteCar: () => {},
  loaded: false,
  loading: false,
  error: null,
  cars: [],
});

export const CarsProvider = (props) => {
  const [cars, setCars] = useState(() => {
    return JSON.parse(localStorage.getItem("cars")) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const [search, setSearch] = useState("");
  const { addToast } = useToasts();

  const CARS_ENDPOINT = "https://carsapp2050.herokuapp.com/api/v1/cars/";

  const fetchCars = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);
    if (loading || loaded || error) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(CARS_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem("cars", JSON.stringify(data));
      setCars(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoaded(true);
      setLoading(false);
    }
  }, [error, loaded, loading]);

  const addCar = useCallback(async (formData) => {
    console.log("about to add", formData);
    try {
      const response = await fetch(CARS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedCar = await response.json();
      console.log("got data", savedCar);
      const newCars = [...cars, savedCar];
      localStorage.setItem("cars", JSON.stringify(newCars));
      setCars(newCars);
      // addToast(`Saved ${savedCar.name}`, {
      //   appearance: "success",
      // });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: "error",
      });
    }
  }, [addToast, cars]);

  const updateCar = useCallback(async (id, formData) => {
    console.log("updating", id, formData);
    let updatedCar = null;
    // Get index
    const index = cars.findIndex((car) => car._id === id);
    console.log(index);
    if (index === -1) throw new Error(`Car with index ${id} not found`);
    // Get actual car
    const oldCar = cars[index];
    console.log("oldCar", oldCar);

    // Send the differences, not the whole update
    const updates = {};

    for (const key of Object.keys(oldCar)) {
      if (key === "_id") continue;
      if (oldCar[key] !== formData[key]) {
        updates[key] = formData[key];
      }
    }

    try {
      const response = await fetch(`${CARS_ENDPOINT}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(updates),
      });

      if (response.status !== 200) {
        throw response;
      }

      // Merge with formData
      updatedCar = {
        ...oldCar,
        ...formData, // order here is important for the override!!
      };
      console.log("updatedCar", updatedCar);
      // recreate the cars array
      const updatedCars = [
        ...cars.slice(0, index),
        updatedCar,
        ...cars.slice(index + 1),
      ];
      localStorage.setItem("cars", JSON.stringify(updatedCars));
      // addToast(`Updated ${updatedCar.name}`, {
      //   appearance: "success",
      // });
      setCars(updatedCars);
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update ${oldCar ? oldCar?.name : id}`, {
        appearance: "error",
      });
    }
  }, [addToast, cars]);

  const deleteCar = useCallback(async (id) => {
    let deletedCar = null;
    try {
      const response = await fetch(`${CARS_ENDPOINT}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (response.status !== 204) {
        throw response;
      }
      // Get index
      const index = cars.findIndex((car) => car._id === id);
      deletedCar = cars[index];
      // recreate the cars array without that car
      const updatedCars = [...cars.slice(0, index), ...cars.slice(index + 1)];
      localStorage.setItem("cars", JSON.stringify(updatedCars));
      setCars(updatedCars);
      console.log(`Deleted ${deletedCar.name}`);
      // addToast(`Deleted ${deletedCar.name}`, {
      //   appearance: "success",
      // });
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update ${deletedCar.name}`, {
        appearance: "error",
      });
    }
  }, [addToast, cars]);

  return (
    <CarsContext.Provider
      value={{
        cars,
        loading,
        error,
        fetchCars,
        addCar,
        updateCar,
        deleteCar,
      }}
    >
      {props.children}
    </CarsContext.Provider>
  );
};
