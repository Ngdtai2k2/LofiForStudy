import axios from 'axios';
import { YOUTUBE_API_KEY, YOUTUBE_API_URL } from '../constants/constant';

export const GetInfoYoutubeByVideoId = async (videoId) => {
  try {
    const res = await axios.get(
      `${YOUTUBE_API_URL}videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`,
    );

    const data = res.data;
    const channelId = data?.items[0]?.snippet.channelId;
    const channelTitle = data?.items[0]?.snippet.channelTitle;

    if (channelId) {
      const thumbnails = await GetInfoChannelByChannelId(channelId);
      return {
        channelTitle: channelTitle,
        channelId: channelId,
        thumbnails: thumbnails,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const GetInfoChannelByChannelId = async (channelId) => {
  try {
    const res = await axios.get(
      `${YOUTUBE_API_URL}channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`,
    );

    const data = res.data;
    const thumbnails = data?.items[0].snippet.thumbnails;
    const thumbnailHigh = thumbnails?.high?.url;
    const thumbnailDefault = thumbnails?.default?.url;
    const thumbnailMedium = thumbnails?.medium?.url;

    return {
      high: thumbnailHigh,
      default: thumbnailDefault,
      medium: thumbnailMedium,
    };
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
