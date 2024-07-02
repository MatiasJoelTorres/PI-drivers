const { createDriver, getDriverById, getAllDrivers, getDriverByName } =require("../controllers/driverController")

const getDriversHandler = async (req,res) => {
    const {name} = req.query;
    try {
        const response = name ? await getDriverByName(name) : await getAllDrivers();
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api"; 

    try {
        const resDetail = await getDriverById(id, source);
        res.status(200).json(resDetail);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createDriverHandler = async (req, res) => {
    const {
      forename,
      surname,
      description,
      nationality,
      birthdate,
      team1,
      team2,
      team3,
      image,
    } = req.body;
  
    try {
      // Forma un array de equipos seleccionados
      const teams = [team1, team2, team3].filter(Boolean); // Filtra los equipos seleccionados que no sean vacíos
  
      const resData = await createDriver(
        forename,
        surname,
        description,
        nationality,
        birthdate,
        teams,
        image,
      );
  
      res.status(200).json(resData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {
    getDriversHandler,
    getDetailHandler,
    createDriverHandler
}