import './Cards.styles.css'

import Card from '../card/Card'


// eslint-disable-next-line react/prop-types
function Cards({allDrivers}) {
const driversList = allDrivers

  return (
    <div className='card-container' >
      {driversList.map((driver) => (
        // eslint-disable-next-line react/jsx-key
        <Card key={driver.id || driver.forename + driver.surname} driver={driver} />
      ))}
    </div>
  )
}


export default Cards