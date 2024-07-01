import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDriverById } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import './Detail.styles.css';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.selectedDriver);
  
  useEffect(() => {
    dispatch(getDriverById(id));
  }, [dispatch, id]);

  // Renderizado condicional de teams
  let teamsContent = null;
  if (driver.teams && Array.isArray(driver.teams)) {
    teamsContent = (
      <div>
        <div>
          {driver.teams.map((team, index) => (
            <p key={index}>Teams: {team.name}</p>
          ))}
        </div>
      </div>
    );
  } else {
    // Si driver.teams no es un array, renderizar como texto
    teamsContent = <p>Teams: {driver?.teams}</p>;
  }

  return (
    <div>
      <div className='detail-container'>
        <div className='detail-left'>
          <h1>Driver: {driver?.forename} {driver?.surname}</h1>
          <p>Nationality: {driver?.nationality}</p>
          <p>Birthdate: {driver?.birthdate}</p>
          {teamsContent} 
          <p>Description: {driver?.description}</p>
          <Link to="/home" className="back-button">
            Volver
          </Link>
        </div>
        <div className='detail-right'>
          <img src={driver?.image} alt={`${driver?.forename} ${driver?.surname}`} className='driver-image' />
        </div>
      </div>
    </div>
  );
}