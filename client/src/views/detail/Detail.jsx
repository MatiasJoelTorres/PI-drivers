import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDriverById } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import './Detail.styles.css';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.selectedDriver);
  console.log(driver)
  
  useEffect(() => {
    dispatch(getDriverById(id));
  }, [dispatch, id]);

  let teamsContent = null;
  if (driver && driver.teams && Array.isArray(driver.teams)){
    const uniqueTeams = Array.from(new Set(driver.teams.map(team => team.name)));
  
    teamsContent = (
      <div>
        <div>
          <p>Teams: {uniqueTeams.join(', ')}</p>
        </div>
      </div>
    );
  } else if (driver && driver.teams) {
    // Si driver.teams no es un array, renderizar como texto
    teamsContent = <p>Teams: {driver?.teams}</p>;
  } else {
    teamsContent = <p>No teams available</p>;
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