import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View } from "react-native";
import PropTypes from "prop-types";
import { ActivityIndicator } from 'react-native-paper';
import videoClass from "./../../classes/videoClass";
import VideoPreview from "../../components/VideoPreview";
import { Button } from "../../components";

const Main = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = useCallback(async (pToken = '') => {
    try {
      setRefreshing(true);
      const request = await videoClass.getList(pToken);
      setVideos(prevVideos => pToken ? [...prevVideos, ...request.data] : request.data);
      setPageToken(request.nextPageToken);
      setRefreshing(false);
    } catch (e) {
      console.error(e);
      setRefreshing(false);
      // Mostrar error al usuario si es necesario
    }
  }, []);

  const onClickVideo = useCallback((item) => {
    navigation.navigate('Details', { id: item.id });
  }, [navigation]);

  const renderFooter = useCallback(() => (
    <ActivityIndicator size="small" />
  ), []);

  const renderItem = useCallback(({ item }) => (
    <VideoPreview
      video={item}
      onPress={() => onClickVideo(item)}
    />
  ), [onClickVideo]);

  const keyExtractor = useCallback((item, index) => `${item.id}_${index}`, []);

  return (
    <View style={{flex: 1 }}>
      <View
        style={{padding: 8}}
      >
        <Button
          icon="eye"
          title="Historial"
          onPress={() => navigation.navigate('Historial')}
        />
      </View>
      <FlatList
        contentContainerStyle={{padding: 8}}
        data={videos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={() => getAllVideos(pageToken)}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={() => getAllVideos()}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

Main.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Main;
