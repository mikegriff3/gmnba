const router = require("express").Router();
const controller = require("../controller/teamController");

router.get("/getAllTeams", controller.getAllTeams);
router.post("/savePlayerInfo", controller.savePlayerInfo);
router.put("/upsertPlayerInfo", controller.upsertPlayerInfo);
router.get("/getTeamsPlayers", controller.getTeamsPlayers);
router.get("/getTeamContracts", controller.getTeamContracts);
router.put("/updateTeams", controller.updateTeams);
router.put("/updatecTeams", controller.updatecTeams);
router.put("/updategTeams", controller.updategTeams);
router.put("/updateiTeams", controller.updateiTeams);
router.post("/createTeams", controller.createTeams);
router.get("/getTeamStats", controller.getTeamStats);
router.put("/updatePlayerStats", controller.updatePlayerStats);
router.put("/updatePlayerAdvancedStats", controller.updatePlayerAdvancedStats);
router.put(
  "/updateCPlayerAdvancedStats",
  controller.updateCPlayerAdvancedStats
);
router.put("/updategPlayersAdv", controller.updategPlayersAdv);
router.get("/getPlayerStats", controller.getPlayerStats);
router.get("/getLeagueStats", controller.getLeagueStats);
router.get("/getcLeagueStats", controller.getcLeagueStats);
router.get("/getgLeagueStats", controller.getgLeagueStats);
router.post("/postCollegePlayers", controller.postCollegePlayers);
router.post("/postgPlayers", controller.postgPlayers);
router.put("/updateCollegePlayers", controller.updateCollegePlayers);
router.put("/updategPlayers", controller.updategPlayers);
router.put("/updategPositions", controller.updategPositions);
router.get("/renderPlayerProfile", controller.renderPlayerProfile);
router.get("/renderTeamProfile", controller.renderTeamProfile);
router.get("/getPlayerProfile/:id", controller.getPlayerProfile);
router.get("/getPostStats/:name", controller.getPostStats);
router.get("/getCatchShootStats/:name", controller.getCatchShootStats);
router.get("/getShootingStats/:name", controller.getShootingStats);
router.get("/getTeamProfile/:id", controller.getTeamProfile);
router.put("/loadTeamLogoColor", controller.loadTeamLogoColor);
router.get("/getTeamColors/:team", controller.getTeamColors);
router.get("/getPositionStats", controller.getPositionStats);
router.get("/getCollegePlayerProfile/:id", controller.getCollegePlayerProfile);
router.get("/getgPlayerProfile/:id", controller.getgPlayerProfile);
router.post("/createCollegeTeams", controller.createCollegeTeams);
router.post("/creategLeagueTeams", controller.creategLeagueTeams);
router.post("/createInternationalTeams", controller.createInternationalTeams);
router.get("/getCollegeTeamColors/:team", controller.getCollegeTeamColors);
router.get("/getgTeamColors/:team", controller.getgTeamColors);
router.get("/getCollegeTeamProfile/:id", controller.getCollegeTeamProfile);
router.get("/getGTeamProfile/:id", controller.getGTeamProfile);
router.get("/getIntTeamProfile/:id", controller.getIntTeamProfile);
router.get("/getCollegeTeamsPlayers", controller.getCollegeTeamsPlayers);
router.get("/getGTeamsPlayers", controller.getGTeamsPlayers);
//router.get("/getIntTeamsPlayers", controller.getIntTeamsPlayers);
router.get("/getcLeagueStats", controller.getcLeagueStats);
router.get("/getgLeagueStats", controller.getgLeagueStats);
router.get("/getcPlayerStats", controller.getcPlayerStats);
router.get("/getgPlayerStats", controller.getgPlayerStats);
router.get("/getcPositionStats", controller.getcPositionStats);
router.get("/getgPositionStats", controller.getgPositionStats);
router.get("/getAllNbaPlayers", controller.getAllNbaPlayers);
router.get("/getAllCollegePlayers", controller.getAllCollegePlayers);
router.get("/getAllgPlayers", controller.getAllgPlayers);
router.post("/createPostStats", controller.createPostStats);
router.post("/createShootingStats", controller.createShootingStats);
router.post("/createCatchShootStats", controller.createCatchShootStats);
router.post("/createPlayerSalaries", controller.createPlayerSalaries);

router.get("/nbaPlayersList", controller.nbaPlayersList);
router.get("/collegePlayersList", controller.collegePlayersList);
router.get("/gPlayersList", controller.gPlayersList);
router.get("/nbaTeamsList", controller.nbaTeamsList);
router.get("/collegeTeamsList", controller.collegeTeamsList);
router.get("/gTeamsList", controller.gTeamsList);

module.exports = router;
