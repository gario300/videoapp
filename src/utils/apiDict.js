import { youtubeApiKey } from "./constanst";
const videosUrl = {
  getVideos: {
    method: "GET",
    url: `videos?part=snippet&chart=mostPopular&key=${youtubeApiKey}&maxResults=15`
  },
  getVideoById: {
    method: "GET",
    url: `videos?part=snippet%2CcontentDetails%2Cstatistics&key=${youtubeApiKey}&id=`
  }
}

export default videosUrl;
