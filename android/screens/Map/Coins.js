import React from 'react';
import {View} from 'react-native';
import {Marker, } from 'react-native-maps';

import {colors, fonts} from '../../../styles';

export default Coins = (props) => {

    const {coins} = props;

    const Markers = () => coins.length > 0 ? coins.map((value,i)=>(
        <Marker key={i} coordinate={value}>
          <View style={{backgroundColor: colors.orange_dark, height:5, width:5}}></View>
        </Marker>
      )): null;

    return(<Markers/>)
};
