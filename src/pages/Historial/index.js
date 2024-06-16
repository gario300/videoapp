import React, {useState, useEffect} from "react"
import { View, FlatList } from "react-native"
import { Text, ActivityIndicator } from "react-native-paper";
import PropTypes from "prop-types";

// Classes
import videoClass from "../../classes/videoClass"
import AuthClass from "../../classes/authClass"

// Components
import VideoPreview from "../../components/VideoPreview";
import { Button } from "../../components";
import EmptyList from "../../components/EmptyListElement";

function Historial({navigation}){
  const [videos, setVideos] = useState([]); 
  const [durationFilter, setDurationFilter] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
   
  const durationButtons = [10, 15, 30]
  useEffect(() => {
    getVideos(10)
  }, []);
  
  const getVideos = async(duration) => {
    setDurationFilter(duration);
    setVideos([]);
    try {
      setRefreshing(true);
      const user = AuthClass.getCurrentUser().uid;
      const videosR = await videoClass.getHistorial(user, duration);
      setRefreshing(false);
      setVideos(videosR);
    } catch (e) {
      setDurationFilter(prev => prev);
      setRefreshing(false);
      console.log(e)
    }
  }

  const onClickVideo = async (item) => {
    try {
      navigation.navigate('Details',{
        id: item.item.id
      }) 
    } catch (e) {
      console.log(e)
    }
  }
  
  const renderFooter = () => {
    return  refreshing ? <ActivityIndicator size="small" /> : null
  };

  return(
    <View
      style={{padding: 8, flex: 1}}
    >
      <Button
        icon="arrow-left"
        title="Regresar"
        onPress={() => navigation.goBack()}
      />
      <Text variant="titleMedium" style={{marginTop: 3}}>
        Ver historial de los ultimos...
      </Text>
      <View
        style={{flexDirection: "row"}}
      >
        {
          durationButtons.map((element, index) => {
            return (
              <Button
                key={"duration_"+index}
                title={element+" min"}
                mode={element !== durationFilter ? "text" : "contained"}
                onPress={() => getVideos(element)}
              >
              </Button>
            )
          })
        }
      </View>
      <FlatList
        data={videos}
        renderItem={(item) => {
          return (
            <VideoPreview
              video={item.item}
              onPress={() => onClickVideo(item)}
            />
          )
        }}
        refreshing={refreshing}
        onRefresh={() => getVideos(durationFilter)}
        ListEmptyComponent={() => <EmptyList/>}
        ListFooterComponent={renderFooter}
      />
    </View>
  )
}

Historial.propTypes = {
  navigation: PropTypes.object
}

export default Historial
