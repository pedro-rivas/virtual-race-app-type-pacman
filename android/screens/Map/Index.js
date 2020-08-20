import React,{useEffect, useState} from 'react';
import {StatusBar, View, Dimensions, Text} from 'react-native';
import {Marker, AnimatedRegion, Polyline, Polygon,} from 'react-native-maps';

import database from '@react-native-firebase/database';
import RNLocation from 'react-native-location';
import Sound from 'react-native-sound';
import {colors, fonts} from '../../../styles';
import {checkpoints} from '../../../coords';

import MapContainer from './Map';
import {map_01, getGameCoins,  map_limits, } from '../../../maps/teul/map_01';
import { getLatLongFromStreet, checkCoints, getStreetAndMoves, getTheCloserPoint,
        getNewCoordsAndRoute, checkUserGhostCollision, showToast, calculateScore,
        RnLocationConfig, RnLocationRequestPermission,} from '../../../actions';
import PrimaryButton from '../../components/PrimaryButton';
import UserCharacter from '../../components/userCharacter';
import Blinky from '../../components/blinky';
import Header from './Header';
import CheckPoints from './CheckPoints';
import Coins from './Coins';
import SquareModal from '../../components/SquareModal';
import ZoomButtons from './ZoomButtons';
import CompleteScreen from './CompleteScreen';
//import Pinky from './android/components/Pinky';
import {BLINKY, PINKY, USER } from './characters';

const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");
//GENERAL
const MAP_ID = 'teul_home';
const TIMER_SPEED = 1150;
gameCoins = getGameCoins();
INITIAL_COINS = gameCoins.length;
let SCORE = 0;
let FINAL_SCORE = 0;
let INITIAL_DATE = new Date().valueOf();
let LOCATION_SUBSCRIBE;
let GAME_STEPS = 1;
let MUSIC;
let METERS_AWAY = 0;
//BLINKY
let STEP_COUNTER_BLINKY = 0;
let TIMER_BLINKY;
let USER_COORDS_SAVED = [];
let BLINKY_COORDS_SAVED = [];


export default _Map = ({route, navigation}) => {
  
  const {user} = route.params;
  const _USER_ = JSON.parse(user);
  FINAL_SCORE = SCORE;

  useEffect(()=>{
    console.log('init maps');
    setUpGeolocation();
    return () => {
      clearInterval(TIMER_BLINKY);
      LOCATION_SUBSCRIBE();
      GAME_STEPS = 1;
      METERS_AWAY = 0;
      STEP_COUNTER_BLINKY = 0;
      USER_COORDS_SAVED = [];
      BLINKY_COORDS_SAVED = [];
      INITIAL_DATE = new Date().valueOf();
      SCORE = 0;
      if(MUSIC){MUSIC.release();}
      console.log('quit maps');
    }
  },[]);

  const [coins, setCoins] = useState(gameCoins);
  const [gameDone, setGameDone] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [guideLine , setGuideLine] = useState([]);
  const [modal, setModal] = useState(false);
  const [zoom, setZoom] = useState(17);

  function setUpGeolocation(){
    RNLocation.configure(RnLocationConfig);
    RNLocation.requestPermission(RnLocationRequestPermission).then(granted => {
        if(granted){
          LOCATION_SUBSCRIBE = RNLocation.subscribeToLocationUpdates(locations => {
            
            const {latitude, longitude} = locations[0];
            const newUserCoords = {latitude, longitude};

            switch (GAME_STEPS) {
              case 1: checkIfCanStart(newUserCoords, map_01, map_limits); break;
              case 2: 
                USER.coordinates.timing({latitude, longitude, useNativeDriver:false}).start();
              break;
              case 3: watchUserMoves(newUserCoords); break;
            }
          });
        }
    });
  }

  const watchUserMoves = (userCoords) => {
    console.log('watching moves');
    let d = getTheCloserPoint(userCoords, map_01);
    const { latitude, longitude } = d[2];
    USER.coordinates.timing({ latitude, longitude, useNativeDriver:false }).start();
            
    let isCoin = checkCoints(latitude, longitude, coins);
    
    if(isCoin >= 0){
      coins.splice(isCoin, 1);
      setCoins([...coins]);
    }

    if(coins.length === 0){ 
      clearInterval(TIMER_BLINKY);
      LOCATION_SUBSCRIBE();
      setGameDone(!gameDone);
      //calcular aqui el puntaje final
    }
    
    USER_COORDS_SAVED.push({ latitude, longitude });

    if(USER_COORDS_SAVED.length >= 3){
        USER_COORDS_SAVED.shift();
    }
  }

  const checkIfCanStart = (user, points, limits) => {
    console.log('=> check if can start');
    const {latitude, longitude} =  user;
    let userCoords = {latitude, longitude};
    let closerPoint = getTheCloserPoint(userCoords,  points);
    let coords = [userCoords, closerPoint[2]];
    
    if(latitude < limits[0].latitude && latitude > limits[2].latitude && longitude > limits[0].longitude && longitude < limits[2].longitude){  
        GAME_STEPS = 3;
        setCanStart(true);
    }else{
        GAME_STEPS = 2;
        METERS_AWAY = Math.floor(closerPoint[1]);
        setGuideLine(coords);
        setModal(!modal);
    }
    USER.coordinates.timing({latitude: closerPoint[2].latitude, longitude: closerPoint[2].longitude, useNativeDriver:false}).start();
  }


  function defineDirection(street_number, direction){
    //console.log('-- street: ',street_number,'direction: ', direction);
    const {street, moves} = getStreetAndMoves(map_01, street_number);
    nextMovement(street, moves, street_number, direction);
    STEP_COUNTER_BLINKY +=1; 
    SCORE = calculateScore(coins.length, INITIAL_COINS, INITIAL_DATE);
  }

  function inCheckPoint(street, oldDirection){
    clearInterval(TIMER_BLINKY);
    STEP_COUNTER_BLINKY = 0;
    const {newRoute, newCoords, checkPointsAvailables} = getNewCoordsAndRoute(street, oldDirection, checkpoints);
    //console.log('| route ended |\n','-- check points availables --: ', checkPointsAvailables, '\n', '=> route selected: ', newRoute, '\n=> new coords: ', newCoords);
    goToCheckPoint(newCoords, newRoute.street, newRoute.direction);
  }

  function goToCheckPoint(newCoords, newStreet, newDirection){
    const {latitude, longitude} = newCoords;
    animatedGhost(latitude, longitude);
    //console.log('-- new street', newStreet, 'new direction ', newDirection);
    setTimeout(()=>{
      TIMER_BLINKY = setInterval(()=> { defineDirection(newStreet, newDirection); }, TIMER_SPEED );
    }, TIMER_SPEED );
  }


  function nextMovement(street, moves, street_number, direction){
    if(STEP_COUNTER_BLINKY > moves){
      inCheckPoint(street_number, direction)
    }else{ 
      let step = direction === 'up' || direction === 'right' ? moves - STEP_COUNTER_BLINKY : STEP_COUNTER_BLINKY;
      const cords = getLatLongFromStreet(street, step); 
      animatedGhost(cords.latitude, cords.longitude);
    }
  }


  function animatedGhost(latitude, longitude){
    BLINKY.coordinates.timing({latitude, longitude, useNativeDriver:false}).start();

    BLINKY_COORDS_SAVED.push({latitude, longitude});
    
    if(BLINKY_COORDS_SAVED.length >= 3){
        BLINKY_COORDS_SAVED.shift();
    }

    let collision = checkUserGhostCollision(USER_COORDS_SAVED, BLINKY_COORDS_SAVED);
    
    if(collision){gameIsOver();}
  }

  const gameIsOver = () => {
    clearInterval(TIMER_BLINKY);
    LOCATION_SUBSCRIBE();
    setGameOver(!gameOver);
  }

  const startGame = () => {
      GAME_STEPS = 3;
      setInGame(true);
      TIMER_BLINKY = setInterval(()=> {
        defineDirection( BLINKY.start_street(), BLINKY.start_direction() );
        //defineDirection(1, 'up');
      }, TIMER_SPEED);
      startMusic();
  }

  const startMusic = () => {
    Sound.setCategory('Playback');
    MUSIC = new Sound('arcade_kid.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (!error) { MUSIC.setVolume(0.3).setNumberOfLoops(-1).play(); }
    });
  }
  
  const manageZoom = (kind) => {
    if(kind === 'in'){
      if(zoom <= 18){ setZoom(zoom+1);}
    }else{
      if(zoom >= 18){ setZoom(zoom-1);}
    }
  }

  function finishGame(score){
    const map_id = MAP_ID;
    const _user = _USER_;
    //const score = SCORE;
    
    let updates = {};
        const info = {
          score, 
          time_stamp: new Date().valueOf(),
          name: _user.name,
          id: _user.id,
          img: _user.img,
        }
        updates[`score/maps/${map_id}/${_user.id}/`] = info;
        updates[`users/${_user.id}/maps/${map_id}/`] = info;
        database().ref().update(updates).then(() => {
          navigation.navigate('Home', {user: JSON.stringify(_USER_)});
        }).catch(error => showToast(error))
    }

  return (
    <>
    <StatusBar backgroundColor={'black'}/>
       
        <MapContainer 
          height={HEIGHT} width={WIDTH} inGame={inGame} zoom={zoom}
          coords={map_01[1][0]}
        >
          {inGame ? <CheckPoints checkpoints={checkpoints}/> : null}
          {inGame ? <Coins coins={coins}/> : null}
          {inGame ? <Marker.Animated coordinate={BLINKY.coordinates}><Blinky/></Marker.Animated> : null}
          
          <Marker.Animated coordinate={USER.coordinates}><UserCharacter img={_USER_.img}/></Marker.Animated>

          {guideLine.length > 0 && canStart === false? 
            <Polyline coordinates={guideLine} strokeColor={colors.blue} strokeWidth={4} lineDashPattern={[2]}/>
          : null}
        </MapContainer>
        
        {(inGame === true && gameOver === false) ? 
          <ZoomButtons in={()=> manageZoom('in')} out={()=> manageZoom('out')}/>
        :null}

        {inGame === true ?
        <Header score={SCORE} coins={coins.length}/>
        : null}

        {canStart === true && inGame === false? 
            <View style={{position:'absolute', bottom:20, alignItems:'center', width:'100%'}}>
                <PrimaryButton action={()=> startGame()} text={'START GAME'} color={'green'} />
            </View>
        : null}

        {gameDone === true ? 
            <CompleteScreen 
              width={WIDTH} height={HEIGHT} action={() => finishGame(FINAL_SCORE)} score={FINAL_SCORE}
            />
        : null} 
         {gameOver=== true ? 
            <SquareModal 
              message={`Score: ${FINAL_SCORE}`}
              width={WIDTH} height={HEIGHT} title={'Game Over'}
            >
              <PrimaryButton action={() => finishGame(FINAL_SCORE)} text={'DONE'} color={'red'} />
            </SquareModal>
          : null}  

        {modal ? 
          <SquareModal 
          width={WIDTH} height={HEIGHT} title={'Out of Limits'}
          close={true} closeAction={()=> setModal(!modal)}
          message={`You´re ${METERS_AWAY} mts away from the game zone. Follow the blue line && start the game again`}>
          </SquareModal>
          : null 
        }

        
    </>
  );
};



/* {map_01.map((value,i) => {
          return value.map((street, x)=>(
            <Marker key={x} coordinate={street}>
              <View style={{backgroundColor:'rgba(252,163,17,.5)', height:5, width:5}}></View>
            </Marker>)
          )})} */