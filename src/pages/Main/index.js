import React, {useState, useEffect} from "react"
import { FlatList, View  } from "react-native"
import PropTypes from "prop-types";
import { ActivityIndicator } from 'react-native-paper';
// Classes
import videoClass from "./../../classes/videoClass";

// Components
import VideoPreview from "../../components/VideoPreview";
import { Button } from "../../components";

function Main({navigation}){
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  

  useEffect(() => {
    getAllVideos(); 
  }, []);
  
  const getAllVideos = async (pToken) => {
    try {
      setRefreshing(true)
      const request = await videoClass.getList(pToken);
      let newArr = []
      if (!pToken) {
        newArr = request.data
      }
      if (pToken) {
        newArr = videos.concat(request.data)
      }
      setPageToken(request.nextPageToken);
      setVideos(newArr);
      setRefreshing(false);
    } catch (e) {
      console.log(e)
    }
  };

  const onClickVideo = async (item) => {
    try {
      /*
       * Se tenía para contabilizar en el
       * historial pero se mueve al componente del
       * detalle para eliminar latencia
        const user = AuthClass.getCurrentUser();
        await videoClass.saveToHistorial(item.item.id, user.uid)
      */
      navigation.navigate('Details',{
        id: item.item.id
      }) 
    } catch (e) {
      console.log(e)
    }
  }

  const renderFooter = () => {
    return  <ActivityIndicator size="small" />
  };

  return(
    <View style={{padding: 8, flex: 1}}>
      <Button
        icon="eye"
        title="Historial"
        onPress={() => navigation.navigate('Historial')}
      />
      <FlatList
        data={videos}
        keyExtractor={(item, index) => item.id+"_"+index}
        renderItem={(item) => {
          return (
            <VideoPreview
              video={item.item}
              onPress={() => onClickVideo(item)}
            />
          )
        }}
        onEndReached={() => getAllVideos(pageToken)}
        onEndReachedThreshold={0.5} 
        refreshing={refreshing}
        onRefresh={() => getAllVideos()}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

Main.propTypes = {
  navigation: PropTypes.object
};
export default Main
