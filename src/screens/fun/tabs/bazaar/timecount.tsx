import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, Image, Dimensions, Animated, Easing} from "react-native";

// import { Wave } from 'react-native-waveview';

import {ArtTest} from '../../../../components/animation/Art';
import Wave from '../../../../components/animation/Wave';

import {Icon, } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../../../../src/components/header';
import { styles } from './style';
import { images } from '../../../../../src/libs/images';

import {TouchableOpacity} from 'react-native';

var sec = 60;
var hVal = 100;
const {width, height} = Dimensions.get('window');

const waveParams = {
  "length": '200',
}

export const TimeCount = (props: any) => {
  const [timeStr, setTimeStr] = useState("00:00");
  const [total, setTotal] = useState(props.navigation.getParam('timecount'));
  
  const [sec1, setSec] = useState(props.navigation.getParam('sec'));
  const[bH, setHVal] = useState(false);
  // sec = sec1
  const deltaVal = 190/(60*Number(total));
  // console.log(hVal)0

  const spinValue = new Animated.Value(0);
  Animated.timing(
    spinValue,
    {
      toValue: 1,
      duration: 0,
      easing : Easing.linear

    }
  ).start();
  // Animated.delay(1000);

  var spin = spinValue.interpolate({
    inputRange: [-1,0],
    outputRange: ['0deg', '0deg']
  })
  var spin1 = spinValue.interpolate({
    inputRange: [0,1],
    outputRange: ['-6deg', '-6deg']
  })
  var spin2 = spinValue.interpolate({
    inputRange: [0,1],
    outputRange: ['-12deg', '-12deg']
  })
  var spin3 = spinValue.interpolate({
    inputRange: [0,1],
    outputRange: ['-18deg', '-18deg']
  })
  var spin4 = spinValue.interpolate({
    inputRange: [0,1],
    outputRange: ['-24deg', '-24deg']
  })
  
  useEffect(() => {
    if( sec1 === 60 )
    {
      setSec(0);
            sec = 60;
    }
    const timer = setInterval(() => {
      sec = sec - 1;
      if( total === 0 && sec === 0 )
      {
          // setStop(true);
          setTimeStr("00:00");
          Animated.timing(spinValue,
            {
              toValue: 0,
            }).stop();
          // props.navigation.Close();
          props.navigation.goBack();
          return;
      }
      if( sec === 0 ) sec = 60;
      if( sec === 60 )
       {
         var tt = total - 1;
            if( sec < 10 && tt < 10 )
            setTimeStr("0" + tt.toString()+":0"+ sec.toString());
          else if( sec > 9 && tt < 10 )
            setTimeStr("0" + tt.toString()+":"+ sec.toString());
          else if( sec < 10 && tt > 9)
            setTimeStr(tt.toString()+":0"+ sec.toString());
          else if( sec > 9 && tt > 9)
            setTimeStr(tt.toString()+":"+ sec.toString());
          setTotal(tt);
       }  
      else if( sec > 0 )
      {
        
        if( sec < 10 && total < 10 )
          setTimeStr("0" + total.toString()+":0"+ sec.toString());
        else if( sec > 9 && total < 10 )
          setTimeStr("0" + total.toString()+":"+ sec.toString());
        else if( sec < 10 && total > 9)
          setTimeStr(total.toString()+":0"+ sec.toString());
        else if( sec > 9 && total > 9)
          setTimeStr(total.toString()+":"+ sec.toString());

          
      }

      hVal += deltaVal;
      
      
    }, 1000);
   
      return () => {
        clearInterval(timer);
      };
  }, [timeStr]);

  const onCancel=()=>{
      setTimeStr("00:00");
      props.navigation.goBack();
  }
    return (
      
      <>
    <SafeAreaView style={{ flex: 1, backgroundColor:'#FFF',justifyContent:'center', alignItems:'center'  }}>
      <Wave
          style={_styles.waveBall}
          total = {Number(total)}
          H={200}
          waveParams={[
              {A: 10, T: 380, fill: '#62c2ff'},
              {A: 15, T: 340, fill: '#0087dc'},
              {A: 20, T: 200, fill: '#1aa7ff'},
          ]}
          animated={true}
      />
      <Text style={{color:'#31F94D', fontSize:36, fontWeight:'700', marginTop:-120, }}>{timeStr}</Text>

      {sec % 5 === 0 ? <Animated.Image 
        style = {{width: 300, height:300, marginTop: -180, transform : [{rotate : spin}]}}
        source = { images.watch}
      /> : <View ></View> }
      {sec % 5 === 1 ? <Animated.Image 
        style = {{width: 300, height:300, marginTop: -180, transform : [{rotate : spin1}]}}
        source = { images.watch}
      /> : <View ></View> }
      {sec % 5 === 2 ? <Animated.Image 
        style = {{width: 300, height:300, marginTop: -180, transform : [{rotate : spin2}]}}
        source = { images.watch}
      /> : <View ></View> }
      {sec % 5 === 3 ? <Animated.Image 
        style = {{width: 300, height:300, marginTop: -180, transform : [{rotate : spin3}]}}
        source = { images.watch}
      /> : <View ></View> }
      {sec % 5 === 4 ? <Animated.Image 
        style = {{width: 300, height:300, marginTop: -180, transform : [{rotate : spin4}]}}
        source = { images.watch}
      /> : <View ></View> }


    </SafeAreaView>
    </>
  );
  
};

const BoxCircleAndPoint = (props: any)=>{
  return (
      <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:'70%'}}>
        <View style={{flexDirection:'column', width:100, height: 100, borderRadius: 50,  alignItems:'center', }}>
        <Image style={{width: 100, height:100}} source={images.ball_gif}></Image>
         <Text style={{color:'#FFF', fontSize:18, fontWeight:'700', marginTop: -55}}>{props.time}</Text>
         </View>
      </View>
  );
};

const _styles = StyleSheet.create({
  container: {
      flex: 1,
      marginVertical: 10,
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: StyleSheet.hairlineWidth,
  },
  wave: {
      width: 100,
      aspectRatio: 1,
      overflow: 'hidden',
      backgroundColor: 'white',
  },
  waveBall: {
      borderColor:'#1aa7ff',
      borderWidth: 1,
      width: 200,
      aspectRatio: 1,
      borderRadius: 100,
      overflow: 'hidden',
  }
});