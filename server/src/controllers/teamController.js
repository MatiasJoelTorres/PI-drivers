const axios = require("axios");
const { Team } = require("../db");

const infoMap = (arr) => {
    return arr.map((driver) => {
        return {
            team: driver.teams || '' // Asegurarse de que team no sea undefined
        };
    });
};

const getAllTeamsApi = async () => {
    const infoApi = (await axios.get("http://localhost:5000/drivers")).data;
    const teamsApi = infoMap(infoApi);
    const uniqueTeams = new Set();
    
    teamsApi.forEach(obj => {
        if (obj.team) {
            const teams = obj.team.split(',').map(team => team.trim()).filter(team => team !== '');
            teams.forEach(team => uniqueTeams.add(team));
        }
    });

    const resArr = Array.from(uniqueTeams).map(team => ({ team }));
    return resArr;
};

const getAllTeams = async () => {

    try {
        const teamsDB = await Team.findAll();

        if (teamsDB.length === 0) {//verificar si la DB esta vacia para almacenar los teams
            const teamsApi = await getAllTeamsApi();

            //guardar los teams en la DB
            for (const team of teamsApi) {
                if (team.team) {
                    try {
                        await Team.create({ name: team.team });
                    } catch (error) {
                        console.error(`Error saving team ${team.team}:`, error);
                    }
                }
            }
            return teamsApi;
        }
        return teamsDB
    } catch (error) {
        console.error("Error fetching or saving teams:", error);
        throw error; //para manejar el error
    }
}

module.exports = { getAllTeams };






