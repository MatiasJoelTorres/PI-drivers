import { GET_BY_NAME, GET_DRIVERS, GET_DRIVER_BY_ID, CREATE_DRIVER_FAILURE, CREATE_DRIVER_SUCCESS, GET_TEAMS } from "../actions"

let initialState = {
    allDrivers:[],
    allTeams:[],
    driversCopy: [], 
    selectedDriver: [],
    drivers: [], // Podrías tener una lista de drivers en tu estado si es necesario
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
                allDrivers: action.payload
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
        default:
            return state
    }
}

export default rootReducer