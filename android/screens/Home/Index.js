import React, {useEffect, useState} from 'react';
import {StatusBar, View, Dimensions, Linking} from 'react-native';

import RNLocation from 'react-native-location';
import Sound from 'react-native-sound';
import {colors, fonts} from '../../../styles';

import Title from './Title';
import Card from './Card';
import Lines from './Lines';
//GENERAL
const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");

let _USER_;
let MUSIC;
const MAP_ID = 'teul_home';
const ADRESS = "https://www.google.com.mx/maps/place/21%C2%B028'02.6%22N+103%C2%B027'43.1%22W/@21.467395,-103.4641541,17z/data=!3m1!4b1!4m14!1m7!3m6!1s0x8428798efdfc096f:0x6da47b8130f5b769!2sT%C3%A9ul+de+Gonz%C3%A1lez+Ortega,+Te%C3%BAl+de+Gonz%C3%A1lez+Ortega,+Zacatecas!3b1!8m2!3d21.4658511!4d-103.4598473!3m5!1s0x0:0x0!7e2!8m2!3d21.4673895!4d-103.4619602";

export default Home = ({route, navigation}) => {
  
  const {user} = route.params;
  _USER_ = JSON.parse(user);

  useEffect(()=>{
    console.log('init home');

    startMusic();

    return () => {
      if(MUSIC){MUSIC.release();}
      console.log('quit home');
    }
  },[]);

  const [coins, setCoins] = useState();

  const startMusic = () => {
    Sound.setCategory('Playback');
    MUSIC = new Sound('retro_funk.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (!error) { MUSIC.setVolume(0.2).setNumberOfLoops(-1).play(); }
    });
  }

  function goToMap(){
    if(MUSIC){MUSIC.release();}
    navigation.navigate('Map', {user: JSON.stringify(_USER_)});
  }

 
  return (
    <>
        <StatusBar backgroundColor={'black'}/>
        <View 
          style={{backgroundColor: colors.darkBackground, width: WIDTH, height: HEIGHT,
                 paddingTop:40, alignItems:'center', 
          }}
        >
          <Title title={'MAPS'}/>
          <View style={{width: WIDTH, height:80}}></View>
          <Card
            height={HEIGHT} width={WIDTH} 
            title={'HOME'} place={'TEUL'}
            goToMap={()=> goToMap()}
            goToAdress={()=> Linking.openURL(ADRESS)}
            goToLeaderboard={()=> navigation.navigate('Leaderboard',{user: JSON.stringify(_USER_), map_id: MAP_ID})}
            navigation={navigation}
          />
         <Lines width={WIDTH} height={HEIGHT}/>
        </View>
    </>
  );
};

