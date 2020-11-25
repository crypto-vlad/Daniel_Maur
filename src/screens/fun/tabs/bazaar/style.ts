import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
    },
    backImg: {
        position: 'absolute',
        // top: -12,
        width: width,
        height: height,
    },
    view1:{marginTop: 20, marginRight:5, width:12, height: 12, backgroundColor: '#3082ed', borderRadius:6, justifyContent:'center', alignItems:'center'},
    view2:{marginTop: 20, marginRight:5, width:12, height: 12,  borderRadius:6, justifyContent:'center', alignItems:'center'},
    linearGradient: {
    
      marginTop:10,
      width: 80,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      shadowColor: 'rgba(47, 128, 237, 0.55)',
      shadowOffset: { width: 6, height: 0 },
      shadowRadius: 13
    },
    waveBall: {
      width: 100,
      aspectRatio: 1,
      borderRadius: 50,
      overflow: 'hidden',
   }
    
})