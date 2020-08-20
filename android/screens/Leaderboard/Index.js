import React, {useEffect, useState} from 'react';
import {StatusBar, View, Dimensions, ActivityIndicator, Text, ScrollView} from 'react-native';

import database from '@react-native-firebase/database';
import {colors, fonts} from '../../../styles';

import Title from '../Home/Title';
import Lines from '../Home/Lines';
import Player from './Player';
//GENERAL
const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

export default Leaderboard = ({route, navigation}) => {
  
  const {user, map_id} = route.params;
  const _USER_ = JSON.parse(user);

  useEffect(()=>{
    console.log('init home');

   getPlayers(map_id);

    return () => {
     
      console.log('quit home');
    }
  },[]);

  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);

  function getPlayers(_map){
    database().ref(`score/maps/${_map}/`).orderByChild('score').limitToLast(15).once('value', snap => {
        if(snap.val()){
            const p = snap.val();
            let users = [];
            for (const key in p) { users.push(p[key]); }
            setPlayers(users);
        }
        setLoading(false);
    });
  }
 
  return (
    <>
        <StatusBar backgroundColor={'black'}/>
        <View 
          style={{backgroundColor: colors.darkBackground, width: WIDTH, height: HEIGHT,
                 paddingTop:40, alignItems:'center', 
          }}
        >
          <Title title={'LEADERBOARD'}/>
          <View style={{width: WIDTH, height:80}}></View>
          <View style={{borderWidth:10, borderColor: colors.orange, borderRadius:25, width: WIDTH-40, padding:20,
            borderRightWidth:5,  borderLeftWidth:5,}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20}}>
                <Text style={{ color:colors.blue, fontSize:16, fontFamily: fonts.retro_bold}}>Position</Text>
                <Text style={{ color:colors.blue, fontSize:16, fontFamily: fonts.retro_bold}}>Player</Text>
                <Text style={{color:colors.blue, fontSize:16, fontFamily: fonts.retro_bold}}>Score</Text>
            </View>
            <ScrollView style={{height: HEIGHT/10*5}}>
                {loading ? <ActivityIndicator color={colors.orange} size={'large'}/>
                : 
                players.length > 0 ? 
                        players.map((p, i)=> <Player key={i} place={i+1} name={p.name} img={p.img} score={p.score}/>)
                    : 
                <Text style={{color:'white', fontFamily: fonts.retro_regular}}>No players yet</Text>}
            </ScrollView>
          </View>
         <Lines width={WIDTH} height={HEIGHT}/>
        </View>
    </>
  );
};

