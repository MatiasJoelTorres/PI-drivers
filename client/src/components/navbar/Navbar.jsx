import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from '../../redux/actions';
import { Link } from 'react-router-dom';
import './Navbar.styles.css';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(searchTerm));
  };

  return (
    <div className='navbar'>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="name" 
          type="search" 
          value={searchTerm} 
          onChange={handleInputChange} 
        />
        <button type="submit">Buscar</button>
        <Link to="/create">Crear Driver</Link>
      </form>
      
    </div>
  );
}