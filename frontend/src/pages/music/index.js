import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import RedeemIcon from '@mui/icons-material/Redeem';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

import LoadingEffect from '../../components/LoadingEffect';
import NavigationBar from '../../components/NavigationBar';
import IconButtonWithTooltip from '../../components/IconButtonWithTooltip';
import BoxOverlay from '../../components/BoxOverlay';
import Clock from '../../components/Clock';
import {
  BASE_API_URL,
  DEFAULT_MUSIC,
  YOUTUBE_URL,
} from '../../constants/constant';
import { GetInfoYoutubeByVideoId } from '../../utils/getInfoYoutubeByVideoId';
import {
  toggleState,
  toggleFullScreen,
  handleVolumeChange,
  handleNextSong,
  handlePrevSong,
  fetchData,
  handleDocumentClick,
  getVideoIdByVideoUrl,
} from '../../utils/functionHelper';

import './styles.css';
import ArtistInformation from '../../components/ArtistInformation';
import ModalInputYoutubeUrl from '../../components/ModalInputYoutubeUrl';
import TodoList from '../../components/TodoList';

export default function Music() {
  const [openModalInputYoutube, setOpenModalInputYoutube] = useState(false);
  const [background, setBackground] = useState(null);
  const [loadingBackground, setLoadingBackground] = useState(true);
  const [audio, setAudio] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [loop, setLoop] = useState(false);
  const [songPlay, setSongPlay] = useState(DEFAULT_MUSIC);
  const [currentSong, setCurrentSong] = useState(0);
  const [isEmbedYoutube, setIsEmbedYoutube] = useState(true);
  const [infoYoutube, setInfoYoutube] = useState(null);
  const [infoSong, setInfoSong] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVolumeClicked, setIsVolumeClicked] = useState(false);
  const [isListSongClicked, setIsListSongClicked] = useState(false);
  const [isTodoListClicked, setTodoListClicked] = useState(false);

  const navigate = useNavigate();

  const page = useRef(1);
  const playerRef = useRef(null);

  const handleClickSong = (url, isEmbed, item, id) => {
    setIsEmbedYoutube(isEmbed);
    setSongPlay(url);
    setPlaying(true);
    setInfoSong(null);
    setCurrentSong(id);
    if (item) {
      setInfoYoutube(null);
      setInfoSong(item);
    }
  };

  useEffect(() => {
    const handleVolumeClick = (e) =>
      handleDocumentClick(
        isVolumeClicked,
        setIsVolumeClicked,
        '.volume-control',
        '.slider',
        e,
      );
    document.addEventListener('click', handleVolumeClick);
    return () => {
      document.removeEventListener('click', handleVolumeClick);
    };
  }, [isVolumeClicked]);

  useEffect(() => {
    const handleListSongClick = (e) =>
      handleDocumentClick(
        isListSongClicked,
        setIsListSongClicked,
        '.list-song',
        '.list-song-grid',
        e,
      );
    document.addEventListener('click', handleListSongClick);
    return () => {
      document.removeEventListener('click', handleListSongClick);
    };
  }, [isListSongClicked]);

  useEffect(() => {
    const handleTodoListClick = (e) =>
      handleDocumentClick(
        isTodoListClicked,
        setTodoListClicked,
        '.todo-list',
        '.todo-list-grid',
        e,
      );
    document.addEventListener('click', handleTodoListClick);
    return () => {
      document.removeEventListener('click', handleTodoListClick);
    };
  }, [isTodoListClicked]);

  useEffect(() => {
    const getInfoYoutube = async () => {
      try {
        if (isEmbedYoutube) {
          const videoId = getVideoIdByVideoUrl(songPlay);
          const info = await GetInfoYoutubeByVideoId(videoId);
          setInfoYoutube(info);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getInfoYoutube();
  }, [isEmbedYoutube, songPlay]);

  useEffect(() => {
    document.title = 'Listen to lofi for study!!!';
    fetchData(`${BASE_API_URL}/audio`, setAudio, audio, setHasMore, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getBackground = async () => {
      try {
        setLoadingBackground(true);
        const response = await axios.get(`${BASE_API_URL}/background/random`);
        if (response.data.background && response.data.background.length > 0) {
          setBackground(response.data.background[0].media);
        } else {
          console.error('No background data found in the response.');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingBackground(false);
      }
    };
    getBackground();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="background-image">
        {loadingBackground ? (
          <LoadingEffect />
        ) : (
          <img
            src={background?.url}
            alt={background.description ? background.description : 'background'}
            className="img-fluid"
          />
        )}
      </div>
      <div className="content-container">
        <ReactPlayer
          className="react-player"
          width="0%"
          height="0%"
          ref={playerRef}
          url={songPlay}
          playing={playing}
          muted={muted}
          volume={volume}
          loop={loop}
          onEnded={() => handleNextSong(audio, songPlay, handleClickSong)}
        />
        <Grid container marginX="auto" marginBottom={1}>
          <Grid container item xs={12} md={8} marginX="auto">
            <Grid
              item
              xs={12}
              md={6}
              className="todo-list-grid"
              display={isTodoListClicked ? 'flex' : 'none'}
            >
              <BoxOverlay sx={{ width: '100%' }}>
                <TodoList setState={setTodoListClicked} />
              </BoxOverlay>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="list-song-grid"
              display={isListSongClicked ? 'flex' : 'none'}
            >
              <BoxOverlay sx={{ width: '100%' }}>
                <Box className="list-song-container" id="scrollable-list-song">
                  <InfiniteScroll
                    dataLength={audio.length}
                    next={() => {
                      if (hasMore) {
                        fetchData(
                          `${BASE_API_URL}/audio`,
                          setAudio,
                          audio,
                          setHasMore,
                          page,
                        );
                      }
                    }}
                    hasMore={hasMore}
                    loader={<h6>Loading...</h6>}
                    endMessage={
                      <p style={{ textAlign: 'center', fontSize: 12 }}>
                        <i>Yay! You have seen it all</i>
                      </p>
                    }
                    scrollableTarget="scrollable-list-song"
                  >
                    <List sx={{ width: '100%' }}>
                      <ListItem
                        key={0}
                        className="list-item-style"
                        onClick={() => {
                          handleClickSong(DEFAULT_MUSIC, true, false, 0);
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="white"
                          className="flex-row-center"
                        >
                          {currentSong === 0 ? <ArrowRightRoundedIcon /> : ''}{' '}
                          0. Live Lofi Girl
                        </Typography>
                      </ListItem>
                      {audio.map((item, index) => (
                        <ListItem
                          className="list-item-style"
                          key={item._id}
                          onClick={() => {
                            const url = item.isEmbed
                              ? item?.urlYoutube
                              : item?.media?.url;
                            const isEmbed = item.isEmbed;
                            handleClickSong(url, isEmbed, false, item._id);
                            if (item.isEmbed) {
                              setInfoSong(null);
                            } else {
                              setInfoSong(item);
                              setInfoYoutube(null);
                            }
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="white"
                            className="flex-row-center"
                          >
                            {currentSong === item._id ? (
                              <ArrowRightRoundedIcon />
                            ) : (
                              ''
                            )}
                            {index + 1}. {item.title}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </InfiniteScroll>
                </Box>
              </BoxOverlay>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="flex-end"
              marginRight={1}
            >
              <Typography
                className="flex-row-center"
                variant="body1"
                sx={{ color: 'white' }}
              >
                Send me a tip
                <RedeemIcon sx={{ fontSize: 20, marginLeft: 1 }} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <BoxOverlay>
                <Box display="flex">
                  <IconButtonWithTooltip
                    title="Home"
                    icon={
                      <HomeRoundedIcon size="small" className="icon-style" />
                    }
                    onClick={() => {
                      navigate('/');
                    }}
                  />
                  <IconButtonWithTooltip
                    className="list-song"
                    title="List songs"
                    onClick={() => toggleState(setIsListSongClicked)}
                    icon={
                      <FormatListBulletedIcon
                        size="small"
                        className="icon-style"
                      />
                    }
                  />
                  <IconButtonWithTooltip
                    title={muted ? 'Unmuted' : 'Muted'}
                    onClick={() => toggleState(setMuted)}
                    icon={
                      muted ? (
                        <VolumeDownIcon size="small" className="icon-style" />
                      ) : (
                        <VolumeOffRoundedIcon
                          size="small"
                          className="icon-style"
                        />
                      )
                    }
                  />
                  <IconButtonWithTooltip
                    title={isFullScreen ? 'Default screen' : 'Full Screen'}
                    onClick={() =>
                      toggleFullScreen(isFullScreen, setIsFullScreen)
                    }
                    icon={
                      isFullScreen ? (
                        <FullscreenExitIcon
                          size="small"
                          className="icon-style"
                        />
                      ) : (
                        <FullscreenRoundedIcon
                          size="small"
                          className="icon-style"
                        />
                      )
                    }
                  />
                  <IconButtonWithTooltip
                    title="Youtube"
                    icon={<YouTubeIcon size="small" className="icon-style" />}
                    onClick={() => setOpenModalInputYoutube(true)}
                  />
                  <ModalInputYoutubeUrl
                    openModal={openModalInputYoutube}
                    handleClose={() => setOpenModalInputYoutube(false)}
                    stateSetter={setSongPlay}
                  />
                  <IconButtonWithTooltip
                    title="Change background"
                    icon={<WallpaperIcon size="small" className="icon-style" />}
                  />
                  <IconButtonWithTooltip
                    className="todo-list"
                    title="Todo List"
                    onClick={() => toggleState(setTodoListClicked)}
                    icon={<EventNoteIcon size="small" className="icon-style" />}
                  />
                  <Clock />
                </Box>
              </BoxOverlay>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={8} marginX="auto">
            <Grid item xs={2}>
              <ArtistInformation
                url={
                  infoYoutube?.channelId
                    ? `${YOUTUBE_URL}channel/${infoYoutube?.channelId}`
                    : infoSong?.profileUrl
                }
                channelTitle={infoYoutube?.channelTitle || infoSong?.artist}
                thumbnailsHigh={infoYoutube?.thumbnails?.high}
              />
            </Grid>
            <Grid item xs={10}>
              <BoxOverlay sx={{ height: '100%' }}>
                <Box width="80%">
                  <Marquee direction="left">
                    <Typography variant="body1" color="white">
                      {infoSong
                        ? `${infoSong?.title} - ${infoSong?.artist}`
                        : `${infoYoutube?.titleVideo}`}
                    </Typography>
                  </Marquee>
                </Box>
                <Box>
                  <IconButtonWithTooltip
                    title={loop ? 'No repeat song' : 'Repeat song'}
                    onClick={() => toggleState(setLoop)}
                    icon={
                      loop ? (
                        <RepeatOnIcon size="small" className="icon-style" />
                      ) : (
                        <RepeatIcon size="small" className="icon-style" />
                      )
                    }
                  />
                  <IconButtonWithTooltip
                    onClick={() =>
                      handlePrevSong(audio, songPlay, handleClickSong)
                    }
                    title="Previous song"
                    icon={<ArrowBackIosNewRoundedIcon className="icon-style" />}
                  />
                  <IconButtonWithTooltip
                    title={playing ? 'Pause' : 'Play'}
                    onClick={() => toggleState(setPlaying)}
                    icon={
                      playing ? (
                        <PauseCircleOutlineRoundedIcon
                          size="small"
                          sx={{ fontSize: '40px', color: 'white' }}
                        />
                      ) : (
                        <PlayCircleOutlineRoundedIcon
                          size="small"
                          sx={{ fontSize: '40px', color: 'white' }}
                        />
                      )
                    }
                  />
                  <IconButtonWithTooltip
                    onClick={() =>
                      handleNextSong(audio, songPlay, handleClickSong)
                    }
                    title="Next song"
                    icon={<ArrowForwardIosRoundedIcon className="icon-style" />}
                  />
                  <IconButtonWithTooltip
                    className="volume-control"
                    // title="Change volume"
                    onClick={() => toggleState(setIsVolumeClicked)}
                    icon={
                      <>
                        <VolumeUpRoundedIcon className="icon-style" />
                        <label className="slider">
                          <input
                            className="level"
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={volume}
                            onChange={(e) => handleVolumeChange(e, setVolume)}
                            style={{
                              display: isVolumeClicked ? 'block' : 'none',
                            }}
                          />
                        </label>
                      </>
                    }
                  />
                </Box>
              </BoxOverlay>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
