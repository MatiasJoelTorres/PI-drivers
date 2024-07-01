const axios = require('axios');
const { Op } = require('sequelize');
const { Driver, Team } = require('../db');

const mapDriverInfo = (driver) => {
    const isFromApi = !driver.created;
    return {
        id: driver.id,
        forename: isFromApi ? driver.name.forename : driver.forename,
        surname: isFromApi ? driver.name.surname : driver.surname,
        description: driver.description,
        image: isFromApi
            ? driver?.image?.url?.length > 0
                ? driver.image.url
                : "https://img.freepik.com/fotos-premium/piloto-f1-espera-que-comience-carrera-conceptualizacion-generativa-ai_666746-1409.jpg"
            : driver.image,
        nationality: driver.nationality,
        birthdate: driver.dob || driver.birthdate,
        teams: driver.Teams ? driver.Teams.map(team => ({name: team.name })) : driver.teams,
        created: driver.created,
    };
};
const infoMap = (arr) => {
    return arr.map(mapDriverInfo);
};



const getAllDrivers = async () => {
    const driversDB = await Driver.findAll({
        include: {
            model: Team,
            as: 'Teams',
        }
    });
    const infoApi = (await axios.get("http://localhost:5000/drivers")).data;
    const driversApi = infoMap(infoApi);

    return [...driversDB,...driversApi]
}



const getDriverByName = async (name) => {
    try {
        // Dividir el nombre completo en forename y surname
        const nameParts = name.split('-');
        let forename = '';
        let surname = '';

        if (nameParts.length > 0) {
            forename = nameParts[0];
            surname = nameParts.slice(1).join(' ');
        }


        // Construir la condición de búsqueda
        const whereCondition = {};
        if (forename) {
            whereCondition.forename = { [Op.iLike]: `%${forename}%` };
        }
        if (surname) {
            whereCondition.surname = { [Op.iLike]: `%${surname}%` };
        }

        // Buscar en la base de datos por forename y/o surname
        const driversDb = await Driver.findAll({
            where: whereCondition
        });


        if (driversDb.length > 0) return driversDb;

        // Si no se encuentra en la base de datos, busca en la API
        const response = await axios.get("http://localhost:5000/drivers");
        const driversApi = response.data;


        const mappedDriversApi = infoMap(driversApi);

        // Filtrar los drivers por nombre completo
        const driverFiltered = mappedDriversApi.filter(driver =>
            (!forename || driver.forename.toLowerCase().includes(forename.toLowerCase())) &&
            (!surname || driver.surname.toLowerCase().includes(surname.toLowerCase()))
        );


        return driverFiltered;
    } catch (error) {
        throw new Error(`Error fetching driver by name: ${error.message}`);
    }
};



const getDriverById = async (id, source) => {
    try {
        const driver = source === "api"
            ? (await axios.get(`http://localhost:5000/drivers/${id}`)).data
            : await Driver.findOne({
                where: { id },
                include: [{ model: Team, as: 'Teams' }] // Incluimos la asociación de equipos
            });

        console.log(driver);
        return mapDriverInfo(driver);
    } catch (error) {
        throw new Error(`Error al obtener conductor por ID: ${error.message}`);
    }
};



const createDriver = async (
  forename, 
  surname, 
  description, 
  nationality, 
  birthdate, 
  teamName, // Cambio aquí a teamName en lugar de teamId
  image
) => {
  try {
    const newDriver = await Driver.create({
      forename,
      surname,
      description,
      nationality,
      birthdate,
      image,
    });

    console.log('Conductor creado:', newDriver);

    // Verificar y asociar equipos al conductor recién creado por nombre
    if (teamName) {
      console.log('Nombre del equipo proporcionado:', teamName);

      const team = await Team.findOne({
        where: {
          name: teamName
        }
      });

      if (team) {
        await newDriver.addTeam(team);
        const associatedTeams = await newDriver.getTeams();
        console.log('Equipos asociados al conductor:', associatedTeams.map(team => team.name));
      } else {
        console.log("No se encontró un equipo con el nombre proporcionado.");
      }
    }

    return newDriver;
  } catch (error) {
    console.error(`Error al crear conductor: ${error.message}`);
    throw error;
  }
}

module.exports = {
    getAllDrivers,
    getDriverById,
    getDriverByName,
    createDriver
}