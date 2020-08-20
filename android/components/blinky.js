import React from 'react';
import {View, Image} from 'react-native';

const height = 18;
export default Blinky = () => (
    <View style={{height:height, width:height,}}>
        <Image source={require('../../resources/sprites/blinky.png')} style={{height:height, width:height,}}/>
    </View>
);