import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getByName, 
  getTeamsFromDB, 
  filterTeamDriver, 
  sortByAz, 
  sortByZa, 
  sortByBirthMaj, 
  sortByBirthMin, 
  filterApiDriver, 
  filterDbDrivers 
} from '../../redux/actions';
import { Link } from 'react-router-dom';
import './Navbar.styles.css';

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const teams = useSelector(state => state.allTeams);

  useEffect(() => {
    dispatch(getTeamsFromDB());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(searchTerm));
  };

  const handleFilterByTeam = (teamName) => {
    dispatch(filterTeamDriver(teamName));
  };

  const handleSortBy = (sortType) => {
    switch (sortType) {
      case 'name_az':
        dispatch(sortByAz());
        break;
      case 'name_za':
        dispatch(sortByZa());
        break;
      case 'birth_maj':
        dispatch(sortByBirthMaj());
        break;
      case 'birth_min':
        dispatch(sortByBirthMin());
        break;
      default:
        break;
    }
  };

  const handleFilterBySource = (source) => {
    switch (source) {
      case 'api':
        dispatch(filterApiDriver());
        break;
      case 'db':
        dispatch(filterDbDrivers());
        break;
      default:
        break;
    }
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
        <Link to="/create">Create</Link>
      </form>
      <div className="dropdown">
        <button className="dropbtn">Filtrar por...</button>
        <div className="dropdown-content">
          <div className="submenu">
            <button className="subbtn">Team</button>
            <div className="submenu-content">
              {teams.map((team) => (
                <Link key={team.id} to="#" onClick={() => handleFilterByTeam(team.name)}>{team.name}</Link>
              ))}
            </div>
          </div>
          <Link to="#" onClick={() => handleFilterBySource('api')}>Drivers de API</Link>
          <Link to="#" onClick={() => handleFilterBySource('db')}>Drivers creados</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Ordenar...</button>
        <div className="dropdown-content">
          <Link to="#" onClick={() => handleSortBy('name_az')}>Nombre A-Z</Link>
          <Link to="#" onClick={() => handleSortBy('name_za')}>Nombre Z-A</Link>
          <Link to="#" onClick={() => handleSortBy('birth_min')}>Edad Ascendente</Link>
          <Link to="#" onClick={() => handleSortBy('birth_maj')}>Edad Descendente</Link>
        </div>
      </div>
    </div>
  );
}