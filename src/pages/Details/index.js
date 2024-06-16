import React, {useState, useEffect} from "react"
import { Avatar, Card, Text } from 'react-native-paper';
import { ScrollView, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

// Classes
import videoClass from "../../classes/videoClass";
import AuthClass from "../../classes/authClass";

// Components
import VideoPlayer from "../../components/VideoPlayer";
import { Button } from "../../components";
// Styles 
import styles from "./styles";

const LeftContent = props => <Avatar.Icon {...props} icon="account" />

function Details({route, navigation}){
  const [showMore, setShowMore] = useState(false);
  
  const [videoData, setVideoData] = useState({
    id: "",
    channelName: "",
    title: "",
    description: "",
    tags: [],
    cover: ""
  });
  
  useEffect(() => {
    getVideo(); 
  }, []);
  
  const getVideo = async() => {
    try {
      const video = await videoClass.getVideoById(route.params.id);
      setVideoData(video);
      await onClickVideo(route.params.id)
    } catch (e) {
      console.log(e)
      /* handle error */
    }
  }

  const onClickVideo = async (idVideo) => {
    try {
      const user = AuthClass.getCurrentUser();
      await videoClass.saveToHistorial(idVideo, user.uid)
    } catch (e) {
      console.log(e)
    }
  }

  return(
    <ScrollView style={styles.constainer}>
      <Button
        icon="arrow-left"
        title="Regresar"
        onPress={() => navigation.goBack()}
      />
      <VideoPlayer
        videoId={route.params.id}
      />
      <Card>
        <Card.Title title={videoData.channelName} left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">{videoData.title}</Text>
          <Text
            variant="bodyMedium"
            numberOfLines={!showMore ? 2 : 0}
            ellipsizeMode="tail"
          >
            {videoData.description}
          </Text>
          <TouchableOpacity
            onPress={() => setShowMore(!showMore)}
          >
            <Text style={styles.showMore}>
              {!showMore ? "Mostrar Más" : "Mostrar Menos"}
            </Text>
          </TouchableOpacity>
          <View
            style={styles.tagContainer}
          >
            {
              videoData.tags?.map((tag, index) => {
                return(
                  <Text style={styles.tag} key={tag+"_"+index}>
                    {tag}
                  </Text>
                )
              })
            }
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}
Details.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object
}
export default Details;
