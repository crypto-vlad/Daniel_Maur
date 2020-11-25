import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ImageBackground, StyleSheet, Image} from "react-native";
import {Icon, } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from '../../../../../src/components/header';
import { styles } from './style';
import { images } from '../../../../../src/libs/images';
import {TouchableOpacity} from 'react-native';

var sec = 60;
var total = 0;

export const Bazaar = (props: any) => {
  const [bstart1, onStart1] = useState(false);
  const [bstart2, onStart2] = useState(false);
  const [bstart3, onStart3] = useState(false);
  
    return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={images.back7}
        style={styles.backImg}
      >
         <Header {...props} title={'Pauzr'} profile menu ></Header>
        <View style={styles.container}>
         
          <BoxFlow disp = {1} />
          
        <View style={{flexDirection:'row', position:'absolute', bottom: '20%',paddingLeft:20, paddingRight:20, height: 120,width:'100%', justifyContent:'space-between'}}>
            <BoxCircleAndPoint count = {10} nav = {props.navigation}  time = {9}/>
            <Text style = {{fontSize: 40, color:'#3082ed', marginTop: 10}}>:</Text>
            <BoxCircleAndPoint count = {30} nav = {props.navigation} time = {29}/>
            <Text style = {{fontSize: 40, color:'#3082ed', marginTop: 10}}>:</Text>
            <BoxCircleAndPoint count = {50} nav = {props.navigation} time = {49}/>
        </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
  
};

const BoxFlow = (props: any) => {
  return (
    <View style={{ flexDirection: 'row'}}>
      <View style={props.disp !== 0 ? styles.view2: styles.view1} >
        <View style={{ width:4, height: 4, backgroundColor: '#FFF', borderRadius:2}}></View>
      </View>
      <View style={props.disp !== 1 ? styles.view2: styles.view1} >
        <View style={{ width:4, height: 4, backgroundColor: '#FFF', borderRadius:2}}></View>
      </View>
      <View style={props.disp !== 2 ? styles.view2: styles.view1} >
        <View style={{ width:4, height: 4, backgroundColor: '#FFF', borderRadius:2}}></View>
      </View>
      <View style={props.disp !== 3 ? styles.view2: styles.view1} >
        <View style={{ width:4, height: 4, backgroundColor: '#FFF', borderRadius:2}}></View>
      </View>
      <View style={props.disp !== 4 ? styles.view2: styles.view1} >
        <View style={{ width:4, height: 4, backgroundColor: '#FFF', borderRadius:2}}></View>
      </View>
    </View>
  );
};

const BoxCircleAndPoint = (props: any)=>{
  return (
      <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity style={{flexDirection:'column', width:80, height: 80, borderRadius: 40, justifyContent:'center', alignItems:'center', backgroundColor:'#3C91F1'}}
          onPress = {()=>props.nav.navigate('TimeCount', {timecount: props.time, sec : 60})}
          >
          <Text style={{color:'#FFF', fontSize:18, fontWeight:'700'}}>{props.count}</Text>
          <View style={{flexDirection:'row'}}>
            <Icon
              type={'ionicons'}
              name={'watch'}
              size={12}
              color={'#FFF'}
            ></Icon>
            <Text style={{color:'#FFF', fontSize: 12}}>Minutes</Text>
          </View>

        </TouchableOpacity>
{/*         
        <TouchableOpacity style={{flexDirection:'column', width:80, height: 80, borderRadius: 40,  alignItems:'center', backgroundColor:'#3C91F1'}}
         onPress = {()=>props.onPress()}><Image style={{width: 80, height:80}} source={images.ball_gif}></Image>
         <Text style={{color:'#FFF', fontSize:18, fontWeight:'700', marginTop: -50}}>{props.time}</Text>
          
         </TouchableOpacity>
        } */}
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#55c9f2', '#3082ed'] }
            style={styles.linearGradient}>
              <Text style={{fontSize: 12, color:'#FFF', fontWeight: '700'}}>{props.count}</Text>
              {props.count == 10 && (<Image style={{marginLeft:5, width: 10, height:10}} source={images.yellow_circle}></Image>)}
              {props.count == 30 && (<View style={{flexDirection:'row'}}><Image style={{marginLeft:5, width: 10, height:10}} source={images.yellow_circle}></Image>
              <Image style={{marginLeft:5, width: 10, height:10}} source={images.yellow_circle}></Image></View>)}
              {props.count == 50 && (<View style={{flexDirection:'row'}}><Image style={{marginLeft:5, width: 10, height:10}} source={images.yellow_circle}></Image>
              <Image style={{marginLeft:5, width: 10, height:10}} source={images.yellow_circle}></Image>
              <Image style={{marginLeft:5, width: 10, height:10}} source={images.yellow_circle}></Image></View>)}
          </LinearGradient>
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
      width: 100,
      aspectRatio: 1,
      borderRadius: 50,
      overflow: 'hidden',
  }
});