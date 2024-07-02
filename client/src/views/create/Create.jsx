import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamsFromDB, createDriver } from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import './Create.styles.css';

export default function Create() {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.allTeams);

  const [input, setInput] = useState({
    forename: '',
    surname: '',
    team1: '',
    team2: '',
    team3: '',
    description: '',
    nationality: '',
    birthdate: '',
    image: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTeamsFromDB());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[a-zA-Z]+$/;
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!input.forename || !namePattern.test(input.forename)) {
      newErrors.forename = 'Forename is required and should only contain letters.';
    }

    if (!input.surname || !namePattern.test(input.surname)) {
      newErrors.surname = 'Surname is required and should only contain letters.';
    }

    if (!input.nationality || !namePattern.test(input.nationality)) {
      newErrors.nationality = 'Nationality is required and should only contain letters.';
    }

    if (!input.birthdate || !datePattern.test(input.birthdate) || !isValidDate(input.birthdate)) {
      newErrors.birthdate = 'Birthdate is required and should be in the format dd/mm/yyyy.';
    }

    if (!input.description) {
      newErrors.description = 'Description is required.';
    }

    if (!input.image || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(input.image)) {
      newErrors.image = 'A valid image URL is required.';
    }

    if (!input.team1 || !input.team2) {
      newErrors.team = 'At least two teams must be selected.';
    } else if (input.team1 === input.team2 || input.team1 === input.team3 || (input.team2 && input.team2 === input.team3)) {
      newErrors.team = 'Teams must be unique.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const teamNames = [input.team1, input.team2, input.team3].filter(Boolean);
        const driverData = { ...input, teams: teamNames };

        dispatch(createDriver(driverData));
        alert('Driver creado exitosamente');
        setInput({
          forename: '',
          surname: '',
          team1: '',
          team2: '',
          team3: '',
          description: '',
          nationality: '',
          birthdate: '',
          image: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Error creating driver:', error);
        alert('Hubo un error al crear el driver');
      }
    } else {
      alert('Please fix the errors in the form.');
    }
  };

  return (
    <div className="create-container">
      <h2>Crear Nuevo Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input name="forename" value={input.forename} onChange={handleChange} />
          {errors.forename && <span className="error">{errors.forename}</span>}
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input name="surname" value={input.surname} onChange={handleChange} />
          {errors.surname && <span className="error">{errors.surname}</span>}
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" value={input.description} onChange={handleChange} />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label>Nacionalidad</label>
          <input name="nationality" value={input.nationality} onChange={handleChange} />
          {errors.nationality && <span className="error">{errors.nationality}</span>}
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <input
            type="text"
            name="birthdate"
            placeholder="dd/mm/aaaa"
            value={input.birthdate}
            onChange={handleChange}
          />
          {errors.birthdate && <span className="error">{errors.birthdate}</span>}
        </div>
        <div className="form-group">
          <label>Equipo 1</label>
          <select name="team1" value={input.team1} onChange={handleChange}>
            <option value="">Seleccione un equipo</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Equipo 2</label>
          <select name="team2" value={input.team2} onChange={handleChange}>
            <option value="">Seleccione un equipo</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Equipo 3 (opcional)</label>
          <select name="team3" value={input.team3} onChange={handleChange}>
            <option value="">Seleccione un equipo</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        {errors.team && <span className="error">{errors.team}</span>}
        <div className="form-group">
          <label>Imagen</label>
          <input name="image" type="url" value={input.image} onChange={handleChange} />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <button type="submit">Crear</button>
      </form>
      <Link to="/home" className="back-button">
        Volver
      </Link>
    </div>
  );
}