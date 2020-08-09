import React, { useState, useEffect, useRef } from 'react';
import { Text, View, FlatList, Image, SafeAreaView, Dimensions, StatusBar, Animated } from 'react-native';
import { getTrending } from './apis';
import MaskedView from '@react-native-community/masked-view'
import Svg, { Rect, Line } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient'

const {width,height}=Dimensions.get('window')
const ITEM_SIZE=width*0.7
const BACKDROP_HEIGHT=height*0.6
const SPACER=(width-ITEM_SIZE)/2


const Backdrop=({movies,scrollX})=>{ 
    return <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
    <FlatList
      data={movies.reverse()}
      keyExtractor={(item) => item.key + '-backdrop'}
      removeClippedSubviews={false}
      contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
      renderItem={({ item, index }) => {
        if (!item.backdrop) {
          return null;
        }
        const translateX = scrollX.interpolate({
          inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
          outputRange: [0, width],
          // extrapolate:'clamp'
        });
        return (
          <Animated.View
            removeClippedSubviews={false}
            style={{position: 'absolute', width: translateX, height, overflow: 'hidden'}}
          >
          <Image
            source={{ uri: item.backdrop }}
            style={{
              width,
              height: BACKDROP_HEIGHT,
              position: 'absolute'
            }}
          />
          </Animated.View>
        );
      }}
    />
    <LinearGradient
      colors={['rgba(0, 0, 0, 0)', 'white']}
      style={{
        height: BACKDROP_HEIGHT,
        width,
        position: 'absolute',
        bottom: 0,
      }}
    />
  </View>
}



const Trending = ({
    params,
}) => 

{
    const [movies,setMovies]=useState([])
    const scrollX=useRef(new Animated.Value(0)).current

    

useEffect(()=>{

    const fetchData=async()=>{
        const movies=await getTrending()
        setMovies([{key:'left'},...movies,{key:'right'}])
    }
    if(movies.length===0) fetchData()
    

},[movies])

    return(

    <View style={{justifyContent:'center',flex:1,backgroundColor:'red'}}>

        <StatusBar hidden/>
        <Backdrop movies={movies} scrollX={scrollX}/>
        <Animated.FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'

        contentContainerStyle={{alignItems:'center'}}
        keyExtractor={item=>item.key}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
            [{nativeEvent:{contentOffset:{x:scrollX}}}],
            {useNativeDriver:true}
        )}
        scrollEventThrottle={16}
        renderItem={({item,index})=>{
            if(!item.poster){
                return(
                    <View style={{width:SPACER}}/>
                )
            }
            const inputRange=[
                (index-2)*ITEM_SIZE,
                (index-1)*ITEM_SIZE,
                (index)*ITEM_SIZE
            ]
            const translateY=scrollX.interpolate({
                inputRange,
                outputRange:[0,-50,0]
            })
            return(
                <View style={{width:ITEM_SIZE}}>
                <Animated.View style={{
                    alignItems:'center',
                    marginHorizontal:10,
                    borderRadius:34,
                    padding:20,
                    backgroundColor:'white',
                    transform:[{translateY}]
                }}>
                    <Image source={{uri:item.poster}} style={{width:ITEM_SIZE,height:ITEM_SIZE*1.2,resizeMode:'center',borderRadius:34,marginBottom:10}}/>
                    <Text style={{color:'black',fontSize:24,fontWeight:'bold'}} numberOfLines={1}>{item.title}</Text>
                    <Text style={{color:'black'}} numberOfLines={3}>{item.description}</Text>

                </Animated.View>
                </View>
            )
        }}

/>
    </View>


);
}
export default Trending;
