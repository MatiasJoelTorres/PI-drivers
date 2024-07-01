import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamsFromDB, createDriver } from '../../redux/actions/index';
import './Create.styles.css';

export default function Create() {
  const dispatch = useDispatch();
  const teams = useSelector(state => state.allTeams);

  const [input, setInput] = useState({
    forename: "",
    surname: "",
    teamName: "", // Cambio aquí a teamName en lugar de teamId
    description: "",
    nationality: "",
    birthdate: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getTeamsFromDB());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createDriver(input));
      alert('Driver creado exitosamente');
      setInput({
        forename: "",
        surname: "",
        teamName: "", // Limpiar teamName después de crear el conductor
        description: "",
        nationality: "",
        birthdate: "",
        image: "",
      });
    } catch (error) {
      console.error('Error creating driver:', error);
      alert('Hubo un error al crear el driver');
    }
  };

  return (
    <div className="create-container">
      <h2>Crear Nuevo Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input name="forename" value={input.forename} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input name="surname" value={input.surname} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" value={input.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nacionalidad</label>
          <input name="nationality" value={input.nationality} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento</label>
          <input type="date" name="birthdate" value={input.birthdate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Equipo</label>
          <select name="teamName" value={input.teamName} onChange={handleChange}>
            <option value="">Seleccione un equipo</option>
            {teams.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input name="image" type="url" value={input.image} onChange={handleChange} />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}