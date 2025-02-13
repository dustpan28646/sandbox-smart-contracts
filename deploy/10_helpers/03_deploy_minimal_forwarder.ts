import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  await deploy('TestMetaTxForwarder', {
    from: deployer,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};
export default func;
func.tags = ['TestMetaTxForwarder', 'TestMetaTxForwarder_deploy'];
func.skip = async (hre) => hre.network.name !== 'hardhat';
