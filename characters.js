let BLINKY = {
    start: false,
    coordinates: new AnimatedRegion({
      latitude: 21.467600, 
      longitude: -103.461887,
      latitudeDelta: 0.0000,
      longitudeDelta: 0.0000,
    }),
    init_checkpoint: function(checkpoints){return Math.floor(Math.random() * checkpoints.length)},
    start_directions: function(checkpoints){return checkpoints[this.init_checkpoint][1]},
    start_street: function(){return this.start_directions()[0][0]},
    start_direction: function(){return this.start_directions()[0][1]},
};

export{
    BLINKY,
}