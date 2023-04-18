const RobotMonitor = artifacts.require("RobotMonitor");

module.exports = function(deployer) {
  deployer.deploy(RobotMonitor);
};