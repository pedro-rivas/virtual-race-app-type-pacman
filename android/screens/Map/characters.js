import {AnimatedRegion} from 'react-native-maps';
import {checkpoints} from '../../../coords';

const BLINKY = {
    start: false,
    latitude: 21.467600, 
    longitude: -103.461887,
    coordinates: new AnimatedRegion({
      latitude: 21.466968, 
      longitude: -103.462067,
      latitudeDelta: 0.0000,
      longitudeDelta: 0.0000,
    }),
    init_checkpoint: Math.floor(Math.random() * checkpoints.length),
    start_directions: function(){return checkpoints[this.init_checkpoint === 0 ? 1 : this.init_checkpoint][1]},
    start_street: function(){
      return this.start_directions()[0][0]
    },
    start_direction: function(){
      return this.start_directions()[0][1]
    },
};

const PINKY = {
    start: false,
    latitude: 21.467600, 
    longitude: -103.461887,
    coordinates: new AnimatedRegion({
      latitude: 21.467600, 
      longitude: -103.461887,
      latitudeDelta: 0.0000,
      longitudeDelta: 0.0000,
    }),
    init_checkpoint: Math.floor(Math.random() * checkpoints.length),
    start_directions: function(){return checkpoints[this.init_checkpoint][1]},
    start_street: function(){return this.start_directions()[0][0]},
    start_direction: function(){return this.start_directions()[0][1]},
};

const USER = {
  start: false,
  latitude: 21.467600, 
  longitude: -103.461887,
  coordinates: new AnimatedRegion({
    latitude: 21.468608, 
    longitude: -103.461719,
    latitudeDelta: 0.0000,
    longitudeDelta: 0.0000,
  }),
  init_checkpoint: Math.floor(Math.random() * checkpoints.length),
  start_directions: function(){return checkpoints[this.init_checkpoint][1]},
  start_street: function(){return this.start_directions()[0][0]},
  start_direction: function(){return this.start_directions()[0][1]},
};

export{
     BLINKY,
     PINKY,
     USER
}