import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS"
export const GET_TEAMS = "GET_TEAMS"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_DRIVER_BY_ID = "GET_DRIVER_BY_ID"
export const CREATE_DRIVER_SUCCESS = "CREATE_DRIVER_SUCCESS"
export const CREATE_DRIVER_FAILURE = "CREATE_DRIVER_FAILURE"

const getTeamsForArray = (teams) => {
    if (!teams || !Array.isArray(teams)) {
        console.error("Teams data is not valid:", teams);
        throw new Error("Teams data is not valid");
    }
    const stringTeams = teams.map(obj => obj.name).join(', ');
    return stringTeams;
};
export function getDrivers() {
  return async function (dispatch) {
      try {
          const apiData = await axios.get("http://localhost:3001/drivers");

          const drivers = apiData.data;

          console.log("Datos de conductores recibidos:", drivers);


          let newArray = drivers.map((driver) => {
              try {
                  return {
                      id: driver.id,
                      image: driver.image,
                      forename: driver.forename,
                      surname: driver.surname,
                      teams: (driver.Teams && Array.isArray(driver.Teams)) ? getTeamsForArray(driver.Teams) : driver.teams,
                      birth: driver.birthdate,
                      created: driver.created,
                  };
              } catch (error) {
                  console.error("Error procesando el driver:", driver, error);
                  throw error;
              }
          });

          console.log("Datos de conductores procesados:", newArray);

          dispatch({ type: GET_DRIVERS, payload: newArray });
      } catch (err) {
          console.error("Error al obtener los conductores:", err);
          alert("No se cargaron los teams: " + err.message);
      }
  };
}

export function getByName(name) {
    return async function(dispatch) {
        try {
            // Reemplaza los espacios en blanco con guiones (-)
            // eslint-disable-next-line no-unused-vars
            const formattedName = name.replace(/\s+/g, '-');
            const apiData = await axios.get(`http://localhost:3001/drivers/?name=${formattedName}`);
            const drivers = apiData.data;
            if (!Array.isArray(drivers)) throw new Error('Response is not an array');
            let newArr = drivers.map((driver) => ({
                id: driver.id,
                forename: driver.forename,
                surname: driver.surname,
                image: driver.image,
                teams:  (driver.Teams && Array.isArray(driver.Teams)) ? getTeamsForArray(driver.Teams) : driver.teams,
            }));
            dispatch({
                type: GET_BY_NAME,
                payload: newArr
            });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export function getDriverById(id) {
  return async function (dispatch) {
    try {
      const idData = (await axios.get(`http://localhost:3001/drivers/${id}`)).data;
      console.log(idData)
      dispatch({ type: GET_DRIVER_BY_ID, payload: idData });
    } catch (error) {
      console.error('Error fetching driver detail:', error.message);
      // Manejar el error adecuadamente en el frontend también
    }
  };
}
export function getTeamsFromDB () {
    return async function (dispatch){
        const teamsData = (await axios.get('http://localhost:3001/teams')).data;

        dispatch ({ type: GET_TEAMS, payload: teamsData })
    }
}

export const createDriver = (driverData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3001/drivers', driverData); // Endpoint para crear drivers en tu backend
        dispatch({
          type: 'CREATE_DRIVER_SUCCESS',
          payload: response.data, // Puedes enviar datos adicionales si lo necesitas
        });
      } catch (error) {
        console.error('Error creating driver:', error);
        dispatch({
          type: 'CREATE_DRIVER_FAILURE',
          payload: error.message, // Puedes manejar el error como prefieras
        });
      }
    };
  };

