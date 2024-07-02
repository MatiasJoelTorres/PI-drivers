import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Cards.styles.css';
import Card from '../card/Card';

function Cards() {
  const allDrivers = useSelector(state => state.allDrivers);
  const driversCopy = useSelector(state => state.driversCopy);
  const [driversList, setDriversList] = useState([]);

  useEffect(() => {
    if (driversCopy.length > 0) {
      setDriversList(driversCopy);
    } else {
      setDriversList(allDrivers);
    }
  }, [driversCopy, allDrivers]);

  return (
    <div className='card-container'>
      {driversList.map((driver) => (
        <Card key={driver.id || `${driver.forename}-${driver.surname}`} driver={driver} />
      ))}
    </div>
  );
}

export default Cards;