const axios = require('axios');
const https = require('https');

class RiotLiveClientDataApi {

    constructor(mainWindow) {
        this.mainWindow = mainWindow;
        this.playerNameTeamMap = {};
    }

    init() {
        setInterval(() => {
            this.updateAllGameData(this.mainWindow);
        },1000);
    }

    updateAllGameData(mainWindow) {
        axios({
            url:'https://127.0.0.1:2999/liveclientdata/allgamedata',
            method:'GET',
            timeout: 3000,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).then((response) => {
            console.log('success');
            let liveData = response.data;
            liveData.scoreStats  = this.getScoreStats(liveData);
            liveData.playerStats = this.getPlayerStats(liveData);
            mainWindow.send('RiotLiveClientData',liveData);
        }).catch((err) => {
            console.log('error');
            mainWindow.send('RiotLiveClientEnd',true);
        });
    }


    sToHs(s) {
        var h;
        h  =   Math.floor(s/60);
        s  =   Math.floor(s%60);
        h    +=    '';
        s    +=    '';
        h  =   (h.length==1)?'0'+h:h;
        s  =   (s.length==1)?'0'+s:s;
        return h+':'+s;
    }

    getPlayerStats(data) {
        let res = {blue:[], red:[]};
        if(!data || !data.allPlayers.length || data.allPlayers.length <= 0) {
            return res;
        }
        data.allPlayers.map((v) => {
            v.kda = v.scores.kills + "/" + v.scores.deaths + "/" + v.scores.assists;
            const championInfo = v.rawChampionName.split('_');
            v.image_url = 'http://ddragon.leagueoflegends.com/cdn/10.14.1/img/champion/' + championInfo[3] + '.png';
            if(v.team == "ORDER") {
                this.playerNameTeamMap[v.summonerName] = 'blue';
                res.blue.push(v);
            } else {
                this.playerNameTeamMap[v.summonerName] = 'red';
                res.red.push(v);
            }
        });
        return res;
    }

    getScoreStats(data) {
        let res = {
            blue: {kills:0, towers:0, gold:'X',dragon:[]},
            red: {kills:0, towers:0, gold:'X',dragon:[]},
            game_time: 0
        };

        if(!data || !data.allPlayers.length || data.allPlayers.length <= 0) {
            return res;
        }
        data.allPlayers.map((v) => {
            if(v.team == "ORDER") {
                res.blue.kills += v.scores.kills;
            } else {
                res.red.kills += v.scores.kills;
            }
        });
        data.events.Events.map((v) => {
            if(v.EventTime <= data.gameData.gameTime) {
                if(v.EventName == "DragonKill") {
                    this.playerNameTeamMap[v.KillerName] && void(res[this.playerNameTeamMap[v.KillerName]]['dragon'].push(v.DragonType))
                }
                if(v.EventName == "TurretKilled") {
                    const killedInfo = v.TurretKilled.split('_');
                    if(killedInfo[1] == "T1") {
                        res.red.towers += 1;
                    } else {
                        res.blue.towers += 1;
                    }
                }
            }
        });
        // {
        //     "Assisters": [],
        //     "DragonType": "Elder",
        //     "EventID": 64,
        //     "EventName": "DragonKill",
        //     "EventTime": 2187.742919921875,
        //     "KillerName": "用爱感动麻瓜队友",
        //     "Stolen": "False"
        // }
        //data.gameData.gameTime
        res.game_time = this.sToHs(data.gameData.gameTime);
        return res;
    }
}

module.exports = RiotLiveClientDataApi;
