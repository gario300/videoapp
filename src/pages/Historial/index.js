import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import PropTypes from "prop-types";

// Classes
import videoClass from "../../classes/videoClass";
import AuthClass from "../../classes/authClass";

// Components
import VideoPreview from "../../components/VideoPreview";
import { Button } from "../../components";
import EmptyListElement from "../../components/EmptyListElement";

function Historial({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [durationFilter, setDurationFilter] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  const durationButtons = [10, 15, 30];

  useEffect(() => {
    getVideos(durationFilter);
  }, []);

  const getVideos = async (duration) => {
    setDurationFilter(duration);
    setVideos([]);
    try {
      setRefreshing(true);
      const user = AuthClass.getCurrentUser().uid;
      const videosR = await videoClass.getHistorial(user, duration);
      setVideos(videosR);
    } catch (e) {
      console.error("Error fetching videos:", e);
      // Mostrar errot al usuario de ser necesario
    } finally {
      setRefreshing(false);
    }
  };

  const renderFooter = () => {
    return refreshing ? <ActivityIndicator size="small" /> : null;
  };

  const onClickVideo = useCallback((item) => {
    navigation.navigate('Details', { id: item.id });
  }, [navigation]);

  const renderItem = useCallback(({ item }) => (
    <VideoPreview
      video={item}
      onPress={() => onClickVideo(item)}
    />
  ), [onClickVideo]);

  const keyExtractor = useCallback((item, index) => `${item.id}_${index}`, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{padding: 8}}
      >
        <Button
          icon="arrow-left"
          title="Regresar"
          onPress={() => navigation.goBack()}
        />
        <Text variant="titleMedium" style={{ marginTop: 3 }}>
          Ver historial de los últimos...
        </Text>
        <View style={{ flexDirection: "row", marginTop: 8 }}>
          {durationButtons.map((element, index) => (
            <Button
              key={`duration_${index}`}
              title={`${element} min`}
              mode={element !== durationFilter ? "text" : "contained"}
              onPress={() => getVideos(element)}
            />
          ))}
        </View>
      </View>
      <FlatList
        data={videos}
        contentContainerStyle={{ padding:8 }}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={refreshing}
        onRefresh={() => getVideos(durationFilter)}
        ListEmptyComponent={() => <EmptyListElement />}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

Historial.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Historial;
