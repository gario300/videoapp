import api from "./apiClass";
import apiDict from "./../utils/apiDict";
import QueryingClass from "./queryingclass";
import moment from 'moment';

class VideoClass {
  async getList(pageToken) {
    try {
      let url = apiDict.getVideos.url
      if (pageToken) {
        url = url+'&pageToken='+pageToken
      }
      const getVideos = await api.get(url);
      return {
        data: this.parseVideoObj(getVideos),
        nextPageToken: getVideos.nextPageToken
      }
    } catch (e) {
      throw new Error(`Failed to get video list: ${e.message}`);
    }
  }

  async getVideoById(id) {
    try {
      const getVideo = await api.get(`${apiDict.getVideoById.url}${id}`);
      const video = getVideo.items[0];
      return {
        id: video.id,
        channelName: video.snippet.channelTitle,
        title: video.snippet.title,
        description: video.snippet.description,
        tags: video.snippet.tags,
        cover: video.snippet.thumbnails.high.url,
      };
    } catch (e) {
      throw new Error(`Failed to get video by ID: ${e.message}`);
    }
  }

  async saveToHistorial(videoId, userId) {
    try {
      const validateIfExist = await QueryingClass.findByMultiple("historial", [
        { findBy: "user", where: "==", clause: userId },
        { findBy: "videoId", where: "==", clause: videoId },
      ]);
      const date = moment().format("DD/MM/YYYY HH:mm");

      if (validateIfExist.length === 0) {
        await QueryingClass.addData('historial', { user: userId, videoId: videoId, time: date });
      } else {
        await QueryingClass.updateData('historial', validateIfExist[0].id, {
          ...validateIfExist[0].data,
          time: date,
        });
      }
    } catch (e) {
      throw new Error(`Failed to save to historial: ${e.message}`);
    }
  }

  async getHistorial(userId, filterMinutes) {
    try {
      let getData = await QueryingClass.findByOne('historial', {
        findBy: "user",
        where: "==",
        clause: userId,
      });

      if (getData.length === 0) return [];

      const now = moment();
      const filteredData = getData.filter(
        item => now.diff(moment(item.data.time, 'DD/MM/YYYY HH:mm'), 'minutes') <= filterMinutes
      )
      if (filteredData.length === 0) return [];

      const ids = filteredData.map(item => item.data.videoId).join(",");
      const getVideos = await api.get(`${apiDict.getVideoById.url}${ids}`);
      return this.parseVideoObj(getVideos);
    } catch (e) {
      throw new Error(`Failed to get historial: ${e.message}`);
    }
  }

  parseVideoObj(videosArr) {
    return videosArr.items.map(item => ({
      id: item.id,
      channelName: item.snippet.channelTitle,
      title: item.snippet.title,
      description: item.snippet.description,
      tags: item.snippet.tags,
      cover: item.snippet.thumbnails.high.url,
    }));
  }
}

const videoClass = new VideoClass();
export default videoClass;
