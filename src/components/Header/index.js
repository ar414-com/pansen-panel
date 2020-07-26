import React from "react";
import './styles.scss';
import { Row, Col, Typography } from "antd";
const { Title } = Typography;

const { ipcRenderer } = window.require('electron');

const Header = ({}) => {

    return (
        <Row className="Header">
            <Col flex={1}>
                <img src={require('../../assets/image/pansen.png')} height={'80px'} />
            </Col>
            <Col flex={10} style={{textAlign:'left'}}>
                <Title style={{marginTop:'10px',marginBottom:0,lineHeight:'35px',color:'#00FBAC'}}>
                    PanSen Panel
                </Title>
                <Title level={3} style={{color:'#00FBAC',fontWeight:400,fontSize:'20px',marginTop:'10px',marginBottom:0,lineHeight:'10px'}}>🛠 Riot League of Legends Client Live Data Panel</Title>
            </Col>
            <Col flex={1}>
                <a href="javascript:void(0)" onClick={() => {
                    ipcRenderer.send('go-github',null);
                }}>
                    <img src={require('../../assets/image/github.png')} height={'40px'} />
                </a>
            </Col>
        </Row>
    );
};

export default Header;
