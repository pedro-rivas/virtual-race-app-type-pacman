import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {colors, fonts} from '../../../styles';

import PrimaryButton from '../../components/PrimaryButton';

export default CompleteScreen = ({width, height, action, score}) => { 

    
    return(
   
    <View style={[styles.mainContainer,{width: width, height: height}]}>
        <LinearGradient 
            colors={['rgba(0,0,0,1)', 'rgba(0,0,0,.0)', ]}style={{width: width, height:60}}
        ></LinearGradient>
        <View style={{backgroundColor: colors.blue, borderRadius:50, padding:4, }}>
            <View style={{backgroundColor: colors.red, borderRadius:50, padding:4, }}>
                <View style={{backgroundColor: colors.orange, borderRadius:50, padding:4, }}>
                    <View style={{backgroundColor:'black',  borderRadius:50, padding:12, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontFamily: fonts.retro, fontSize:18, 
                            lineHeight:18, color: 'white'}}>CONGRATULATIONS</Text>
                    </View>
                </View>
            </View>
        </View>

        <View style={[styles.orangeContainer, { width: width}]}>
                <Text style={styles.orangeLabel}>You completed this stage!</Text>
        </View>
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={styles.bigLabel}>SCORE</Text>
            <Text style={styles.scoreLabel}>{score}</Text>
        </View>
        <PrimaryButton action={action} text={'DONE'} color={'green'} />
        <LinearGradient 
            colors={['rgba(0,0,0,.0)', 'rgba(0,0,0,1)',]}style={{width: width, height:60}}
        ></LinearGradient>
    </View>
    
)};

const styles = StyleSheet.create({
    mainContainer:{
        position:'absolute',
        bottom:0, 
        left:0, 
        alignItems:'center', 
        justifyContent:'space-between', 
    },
    orangeContainer:{
        backgroundColor: '#f6801d',  
        borderColor:'#f46603', 
        borderWidth:5,  
        borderLeftWidth:0,
        borderRightWidth:0,
        justifyContent:'center', 
        alignItems:'center',
    },
    orangeLabel:{
        fontFamily: fonts.retro_bold, 
        fontSize:18, 
        padding:10,
        color: 'white',
    },
    bigLabel:{
        fontFamily: fonts.retro, 
        color: 'white', 
        fontSize:26, 
        lineHeight:26,
        marginBottom:5,
    },
    scoreLabel:{
        fontFamily: fonts.retro, 
        color: colors.yellow, 
        fontSize:22, 
        lineHeight: 22,
    },
});