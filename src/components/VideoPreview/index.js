import React from "react"
import { Avatar, Card, Text } from 'react-native-paper';
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
const LeftContent = props => <Avatar.Icon {...props} icon="account" />

function VideoPreview({video, onPress}){
  return(
    <TouchableOpacity
      onPress={onPress}
    >
      <Card mode="outlined" style={{marginBottom: 8}}>
        <Card.Title title={video.channelName} subtitle="" left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">{video.title}</Text>
          <Text
            variant="titleSmall"
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{marginBottom: 10}}
          >
            {video.description}
          </Text> 
        </Card.Content>
        <Card.Cover source={{ uri: video.cover }} />
      </Card>
    </TouchableOpacity>
    )
}

VideoPreview.propTypes = {
  video: PropTypes.shape({
    channelName: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string
  }),
  onPress: PropTypes.func,
}

export default VideoPreview;
