import { 
    GET_BY_NAME, 
    GET_DRIVERS, 
    GET_DRIVER_BY_ID, 
    CREATE_DRIVER_FAILURE, 
    CREATE_DRIVER_SUCCESS, 
    GET_TEAMS, 
    FILTER_API_DRIVERS, 
    FILTER_DB_DRIVERS, 
    FILTER_TEAM_DRIVERS, 
    SORT_BY_A_Z, 
    SORT_BY_Z_A, 
    SORT_BY_BIRTH_MAJ, 
    SORT_BY_BIRTH_MIN
} from "../actions"

let initialState = {
    allDrivers:[],
    allTeams:[],
    driversCopy: [], 
    selectedDriver: [],
    drivers: [], 
    error: null,
}

function rootReducer(state = initialState,action){
    switch(action.type){
        case GET_DRIVERS:
            return {
              ...state,
              allDrivers:action.payload, 
              driversCopy:action.payload
            };

        case GET_TEAMS:
            return{
                ...state,
                allTeams:action.payload
            }

        case GET_BY_NAME:
            return{
                ...state,
                driversCopy: action.payload
            };
        case GET_DRIVER_BY_ID:
            return{
                ...state,
                selectedDriver: action.payload
            };
        case CREATE_DRIVER_SUCCESS:
            return {
                ...state,
                drivers: [...state.drivers, action.payload], // Agrega el nuevo driver creado al estado
                error: null, // Limpia el error si hubo alguno anteriormente
            };
        case CREATE_DRIVER_FAILURE:
            return {
                ...state,
                error: action.payload, // Guarda el mensaje de error en el estado
            };
        case FILTER_API_DRIVERS:{
            const driversApi = state.allDrivers.filter((driver) => !driver.created);
            return {
                ...state,
                driversCopy: driversApi
            }
        }
            
        case FILTER_DB_DRIVERS:{
            const driversDb = state.allDrivers.filter((driver) => driver.created);
            return {
                ...state,
                driversCopy: driversDb
            }
        }
        case FILTER_TEAM_DRIVERS: {
            const filterTeam = state.allDrivers.filter((driver) => {
              return driver.teams && driver.teams.includes(action.payload);
            });
            return {
              ...state,
              driversCopy: filterTeam
            };
          }
        case SORT_BY_A_Z: {
            const sortAz = [...state.driversCopy];
            sortAz.sort((a, b) => a.forename.localeCompare(b.forename));
            return {
                ...state,
                driversCopy: sortAz
            }
        }

        case SORT_BY_Z_A: {
            const sortZa = [...state.driversCopy];
            sortZa.sort((a, b) => b.forename.localeCompare(a.forename));
            return {
                ...state,
                driversCopy: sortZa
            }
        }

        case SORT_BY_BIRTH_MAJ: {
            const orderMajMin = [...state.allDrivers];
            orderMajMin.sort((a,b) => {
                let birthA = new Date(a.birth);
                let birthB = new Date(b.birth);
                return birthA - birthB
            });
            return {
                ...state,
                driversCopy: orderMajMin
            }
        }

        case SORT_BY_BIRTH_MIN: {
            const orderMinMaj = [...state.allDrivers];
            orderMinMaj.sort((a,b) => {
                let birthA = new Date(a.birth);
                let birthB = new Date(b.birth);
                return birthB - birthA 
            });
            return {
                ...state,
                driversCopy: orderMinMaj
            }
        }

        default:
            return state
    }
}

export default rootReducer