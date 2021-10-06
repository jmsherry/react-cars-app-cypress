import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CarsList.css";
import { CarsContext } from "./../../contexts/CarsContext";
// import Loading from './../Loading/Loading';

function CarsList() {
  const {
    fetchCars,
    deleteCar,
    loading,
    error,
    cars,
  } = useContext(CarsContext);


  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <section className="cars-list-section">
      <div className="container">
        <h1 className="section-heading">Cars List</h1>
        {/* <Loading show={loading} /> */}
        {loading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
        {cars?.length ? (
          <ul className="cars-list">
            {cars.map(({ _id, name, bhp, avatar_url }) => (
              <li key={_id} className="cars-list-item">
                <img src={avatar_url} alt={name} className="avatar" />
                <p>
                  {name} ({bhp} bhp)
                </p>
                <Link to={`/cars/update/${_id}`} className="update-link">Update</Link>
                <button onClick={() => deleteCar(_id)} className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        ) : <p>No cars to display</p>}
      </div>
    </section>
  );
}

export default CarsList;
