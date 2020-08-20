import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../../styles';

export default Header = (props) => {
    const {title } = props;
    return(
        <Text style={styles.title}>{title}</Text>
    )
};

const styles = StyleSheet.create({
    title:{
        fontFamily: fonts.retro,
        color: colors.yellow,
        fontSize:20,
        lineHeight:20
    },
    
});