import React from 'react';
import {View} from 'react-native';
import {Marker, } from 'react-native-maps';

import {colors, fonts} from '../../../styles';

export default Checkpoints = (props) => {

    const {checkpoints} = props;

    const Markers = () => checkpoints.map((value,i)=>(
        <Marker key={i} coordinate={value[0]}>
          <View style={{backgroundColor:'orange', height:5, width:5}}></View>
        </Marker>
    ));
   
    return(<Markers/>)
};
