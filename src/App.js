import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ConnectWallet } from '@thirdweb-dev/react';
import './styles/Home.css';
import './styles/RobotMonitor.css';

import robotMonitorAbi from './robotMonitorAbi.json';

const web3 = new Web3(Web3.givenProvider);
const robotMonitorAddress = '0xc44779d5d5Da0B5c0867f8E86286064437265c10';

function App() {
  const [account, setAccount] = useState(null);
  const [robotMonitor, setRobotMonitor] = useState(null);
  const [row, setRow] = useState(null);
  const [col, setCol] = useState(null);
  const [move, setMove] = useState(null);

  useEffect(() => {
  if (window.ethereum) {
    window.ethereum.enable().then(accounts => {
      setAccount(accounts[0]);
      const contract = new web3.eth.Contract(robotMonitorAbi, robotMonitorAddress);
      setRobotMonitor(contract);
    });

    window.ethereum.on('accountsChanged', accounts => {
      setAccount(accounts[0]);
    });
  }
}, []);


  const updateRobotState = async () => {
    if (robotMonitor) {
      const row = await robotMonitor.methods.getRow().call();
      const col = await robotMonitor.methods.getCol().call();
      const move = await robotMonitor.methods.getMove().call();
      setRow(parseInt(row));
      setCol(parseInt(col));
      setMove(move);
    }
  };

  const moveRobot = async (direction) => {
    if (robotMonitor) {
      await robotMonitor.methods[direction]().send({ from: account });
      updateRobotState();
    }
  };

  useEffect(() => {
    updateRobotState();
  }, [robotMonitor]);

  const moveToString = (move) => {
  switch (move) {
    case '0':
      return 'Exit';
    case '1':
      return 'Left';
    case '2':
      return 'Right';
    case '3':
      return 'Up';
    case '4':
      return 'Down';
    default:
      return 'Unknown';
  }
};


  return (
  <div className="container">
    <main className="main">
      <h1>Robot Monitor DApp</h1>
      {account ? (
        <div className="robot-monitor">
          <div className="robot-monitor-info">
            <p>Account: {account}</p>
            <p>Row: {row}</p>
            <p>Col: {col}</p>
            <p>Move: {moveToString(move)}</p>
          </div>
          <div className="robot-monitor-buttons">
            <button onClick={() => moveRobot('moveRight')}>Move Right</button>
            <button onClick={() => moveRobot('moveLeft')}>Move Left</button>
            <button onClick={() => moveRobot('moveUp')}>Move Up</button>
            <button onClick={() => moveRobot('moveDown')}>Move Down</button>
            <button onClick={() => moveRobot('exit')}>Exit</button>
          </div>
        </div>
      ) : (
        <div className="connect">
          <ConnectWallet dropdownPosition={{ side: 'bottom', align: 'center' }} />
        </div>
      )}
    </main>
  </div>
);
}

export default App;
