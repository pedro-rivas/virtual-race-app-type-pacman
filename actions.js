
import {ToastAndroid} from 'react-native';

const getNewAvailobleRoutes = (street, direction) =>{
    switch (street) {
        case 1://                          [street, direction, next poit]
            return direction === 'down' ? [[1, 'up', 2], [3, 'left', 2], [2,'right',2]] :
                   direction === 'up' ? [[1, 'down', 1],[5, 'left', 1],[6, 'right', 1]] : null;
        case 2:
            return direction === 'right' ? [[2, 'left', 4],[7, 'up', 4]] :
                   direction === 'left' ? [[3, 'left', 2],[1, 'up', 2],[2, 'right', 2]] : null;
        case 3:
            return direction === 'right' ? [[3, 'left',2],[1, 'up',2],[2,'right',2]] : 
                    direction === 'left' ? [[3, 'right', 3],[4, 'up', 3]] : null;
        case 4:
            return direction === 'down' ? [[4, 'up',3],[3, 'right',3]] : 
                   direction === 'up' ? [[4, 'down', 5],[5, 'right', 5]] : null;
        case 5:
            return direction === 'left' ? [[4, 'down',5]] : 
                   direction === 'right' ? [[1, 'down', 1],[6, 'right', 1]] : null;
        case 6:
            return direction === 'left' ? [[1, 'down',1],[5, 'left',1]] : 
                   direction === 'right' ? [[6, 'left', 6],[7, 'down', 6]] : null;
        case 7:
            return direction === 'down' ? [[7, 'up',4],[2, 'left',4]] : 
                   direction === 'up' ? [[7, 'down', 6],[6, 'left',6]] : null;
    }
}

const getNewCoords = (checkpoints, selected) => {
    return checkpoints[selected-1][0];
}

const getLatLongFromStreet = (street, i) => {
    return {
      latitude: street[i].latitude,
      longitude: street[i].longitude,
    }
}

const getNewRoute = (checkPointsAvailables) => {
    let route = [checkPointsAvailables[Math.floor(Math.random() * checkPointsAvailables.length)]];
    return{
      street: route[0][0],
      direction: route[0][1],
      checkpoint: route[0][2],
    }
  }

const checkCoints = (latitude, longitude, _coins) => {

    for (let i = 0; i < _coins.length; i++) {
      const element = _coins[i];
      if(element.latitude === latitude && element.longitude === longitude){
        return i;
      }
    }
    return -1;
   
  }

const getStreetAndMoves = (map, street) => {
    const _street = map[street-1];
    const moves = _street.length - 1;
    return{
        street: _street,
        moves: moves,
    }
}

const getNewCoordsAndRoute = (street, oldDirection, checkpoints) => {
  let checkPointsAvailables = getNewAvailobleRoutes(street, oldDirection);
  let newRoute = getNewRoute(checkPointsAvailables);
  let newCoords = getNewCoords(checkpoints, newRoute.checkpoint);
  return {
      newRoute,
      newCoords,
      checkPointsAvailables,
  }
}

const checkUserGhostCollision = (user, blinky) => {
  // console.log('|USER|', user);
  // console.log('|BLINKY|', blinky);
  let col = false
  for (let i = 0; i < user.length; i++) {
      const x = user[i];
      for (let z = 0; z < blinky.length; z++) {
          const y = blinky[z];
          if(x.latitude === y.latitude && x.longitude === y.longitude){
              col = true;
           }
      }
  }

  return col;
}

function haversine(point_1, point_2){
  const R = 6371e3;

  const φ1 = point_1.latitude * Math.PI/180; 
  const φ2 = point_2.latitude * Math.PI/180;
  const Δφ = (point_2.latitude-point_1.latitude) * Math.PI/180;
  const Δλ = (point_2.longitude-point_1.longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c;
  const meters = parseFloat(d.toFixed(2));
  return meters;
  //https://www.movable-type.co.uk/scripts/latlong.html
}

const getTheCloserPoint = (point, coords) => {
  let closerDistance = [];
  for (let i = 0; i < coords.length; i++) {
    const street = coords[i];
    for (let z = 0; z < street.length; z++) {
        const p = street[z];
        const meters = haversine(point, p);
        if(closerDistance.length === 0){
          closerDistance.push([i,meters, p,z]);
        }else{
          if(meters < closerDistance[0][1]){
            closerDistance.shift();
            closerDistance.push([i,meters, p,z]);
          }
        }
    }
  }
  return closerDistance[0];
}

const calculateScore = (coins, initialCoins, initialDate) => {
  const currentTime = new Date().valueOf();
  const time = Math.abs(Math.round((initialDate - currentTime)/1000));
  const score = ((initialCoins - coins)*100)-time;
  return score;
}

const showToast = message => {
  ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 0, 100);
}

//LOCATION CONFIG
const RnLocationConfig = {
      distanceFilter: 5,
      desiredAccuracy: {
        ios: "best", 
        android: "highAccuracy"
      },
      interval: 1000, 
      fastestInterval: 1000,
};

const RnLocationRequestPermission = {
  ios: 'whenInUse',
  android: {
    detail: 'fine',
    rationale: {
      title: "We need to access your location",
      message: "We use your location to show where you are on the map",
      buttonPositive: "OK",
      buttonNegative: "Cancel"
    }
  }
};

export {
    getNewAvailobleRoutes,
    getLatLongFromStreet,
    getNewRoute,
    checkCoints,
    getNewCoords,
    getStreetAndMoves,
    getNewCoordsAndRoute,
    checkUserGhostCollision,
    haversine,
    getTheCloserPoint,
    showToast,
    calculateScore,
    RnLocationConfig,
    RnLocationRequestPermission,
}