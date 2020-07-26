import React, {useEffect, useState} from 'react';
import './App.css';
import GameDetail from "./components/GameDetail";
import "antd/dist/antd.css";
import { Row,Col} from "antd";
import HeaderScore from "./components/HeaderScore";
import _ from "lodash";
import Header from "./components/Header";
const { ipcRenderer } = window.require('electron');

function App() {

  const [allPlayers,setAllPlayers] = useState([]);
  const [events,setEvents] = useState([]);
  const [activePlayer,setActivePlayer] = useState({});
  const [gameData,setGameData] = useState({});
  const [scoreData,setScoreData] = useState({});


  const onRiotLiveClientData = (events,args) => {
    setAllPlayers(args.playerStats);
    setActivePlayer(args.activePlayer);
    setEvents(args.events.Events);
    setGameData(args.gameData);
    setScoreData(args.scoreStats);
  };

  const onRiotLiveClientEnd = () => {
    setScoreData({});
  };

  useEffect(() => {
    ipcRenderer.on('RiotLiveClientData',onRiotLiveClientData);
    ipcRenderer.on('RiotLiveClientEnd',onRiotLiveClientEnd);
    return () => {
      ipcRenderer.removeListener('RiotLiveClientData',onRiotLiveClientData);
      ipcRenderer.removeListener('RiotLiveClientEnd',onRiotLiveClientEnd);
    }
  });

  return (
    <div className="App">
      <Header />
      <div className="Content">
        {
          !_.isEmpty(scoreData) ? <>
            <Row gutter={[8, 24]}>
              <Col span={24}>
                <HeaderScore data={scoreData} />
              </Col>
            </Row>
            <Row justify="space-around" gutter={[8, 24]}>
              <Col span={12}>
                <GameDetail data={allPlayers.blue} />
              </Col>
              <Col span={12}>
                <GameDetail data={allPlayers.red} />
              </Col>
            </Row>
          </> : <div className="start-page">Please start Play Game or OB</div>
        }
      </div>

    </div>
  );
}

export default App;
