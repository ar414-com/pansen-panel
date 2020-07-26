import React from "react";
import './styles.scss';
import { Row, Col } from "antd";

import TowerIcon from '../../assets/image/tower1.png';
import GoldIcon from '../../assets/image/money1.png';
import ScoreIcon from '../../assets/image/score.png';

const HeaderScore = ({data}) => {

    return (
        <div className="header-score-wrapper">
            <Row align="middle header-score">
                <Col span={7} flex={1}  className="item left-right-score font-blue">
                    <span className="tower">
                        <img src={TowerIcon} height="20px" />
                        <span className="count">{data.blue.towers}</span>
                    </span>
                    <span className="gold">
                        <img src={GoldIcon} height="20px" />
                        <span className="count">{data.blue.gold}</span>
                    </span>
                    <div className="dragon">
                        {
                            data.blue.dragon.length > 0 && data.blue.dragon.map(value => (
                                <img src={require(`../../assets/image/${value}.png`)} height={'20px'} />
                            ))
                        }
                    </div>
                </Col>
                <Col span={10} className="item score">
                    <span className="font-blue">{data.blue.kills}</span>
                    <img src={ScoreIcon} height="35px" className="score-icon" />
                    <span className="font-red">{data.red.kills}</span>
                    <div className="game_time">{data.game_time}</div>
                </Col>
                <Col span={7}  className="item left-right-score font-red">
                    <span className="tower">
                        <img src={TowerIcon} height="20px" />
                        <span className="count">{data.red.towers}</span>
                    </span>
                    <span className="gold">
                        <img src={GoldIcon} height="20px" />
                        <span className="count">{data.red.gold}</span>
                    </span>
                    <div className="dragon">
                        {
                            data.red.dragon.length > 0 && data.red.dragon.map(value => (
                                <img src={require(`../../assets/image/${value}.png`)} height={'20px'} />
                            ))
                        }
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HeaderScore;
