import React from "react";
import { Table } from "antd";

const columns = [
    {
        title: 'champion',
        dataIndex: 'image_url',
        key: 'image_url',
        align:'center',
        render: (imageUrl,record) => <div style={{background:'red',width:'30px',margin:'0px auto'}} ><img className={record.isDead ? 'isDead' : ''} src={imageUrl} height={'30px'} /></div>
    },
    {
        title: 'summoner',
        dataIndex: 'summonerName',
        key: 'summonerName',
        align:'center',
    },
    {
        title: 'level',
        dataIndex: 'level',
        key: 'level',
        align:'center',
    },
    {
        title: 'kda',
        dataIndex: 'kda',
        key: 'kda',
        align:'center',
    },
    {
        title: 'spell',
        dataIndex: 'summonerSpells',
        key: 'summonerSpells',
        align:'center',
        render: (data) => (
            <>
                <img src={"http://ddragon.leagueoflegends.com/cdn/10.15.1/img/spell/" + data.summonerSpellOne.rawDescription.split('_')[2] + ".png"} height={'20px'} />
                <img src={"http://ddragon.leagueoflegends.com/cdn/10.15.1/img/spell/" + data.summonerSpellTwo.rawDescription.split('_')[2] + ".png"} height={'20px'} />
            </>
        )
    },
    {
        title: 'items',
        dataIndex: 'items',
        key: 'items',
        align:'center',
        render: (items) => (
            <>
                {items.map(item => {
                    return (
                        <img src={"http://ddragon.leagueoflegends.com/cdn/10.14.1/img/item/" + item.itemID + ".png"} height={'20px'} />
                    )
                })}
            </>
        )
    },
];

const GameDetail = ({data}) => {
    return (
        <Table className="detail" size={'middle'} dataSource={data} pagination={false} columns={columns} />
    );
};

export default GameDetail;
