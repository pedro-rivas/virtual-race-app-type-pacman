import React from 'react';
import {View} from 'react-native';

import FastImage from 'react-native-fast-image';

const HEIGHT = 20;

export default App = ({img}) => (
    <View style={{backgroundColor:'yellow', height:HEIGHT, width:HEIGHT, borderRadius:50}}>
         <FastImage
            style={{ height:HEIGHT, width:HEIGHT, borderRadius:50 }}
            source={{
                uri: img,
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
        />
    </View>
);