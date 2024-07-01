const { Router } = require("express");

const { getDriversHandler, getDetailHandler, createDriverHandler } = require("../handlers/driverHandler")
const { getTeamsHandler } = require("../handlers/teamHandler")

const router = Router();

router.get("/drivers", getDriversHandler);
router.get("/drivers/:id", getDetailHandler);
router.post("/drivers", createDriverHandler);
router.get("/teams", getTeamsHandler);

module.exports = router;
