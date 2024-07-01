/* eslint-disable react/prop-types */
import './Card.styles.css'
import { Link } from "react-router-dom"
// eslint-disable-next-line react/prop-types
export default function Card({driver}) {

  // eslint-disable-next-line react/prop-types
  const {forename, surname, image, teams, id} = driver


// eslint-disable-next-line no-undef
  return (
    <div className='card'>
      <Link to={`/home/${id}`}>
        <div className='card-image-container'>
          <img src={image}  alt={`${forename} ${surname}`} className='card-image'/>
        </div>
        <div className='card-info'>
          <h1>{`${forename} ${surname}`}</h1>
          <h2>{teams}</h2>
        </div>
      </Link>
    </div>
  )
}




