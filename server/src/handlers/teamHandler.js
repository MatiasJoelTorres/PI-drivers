const { getAllTeams } = require("../controllers/teamController");

const getTeamsHandler = async (req, res) => {
    try {
        const resTeams = await getAllTeams();
        res.status(200).send(resTeams);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getTeamsHandler };