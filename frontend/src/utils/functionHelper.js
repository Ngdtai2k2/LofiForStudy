import axios from 'axios';

// change state
export const toggleState = (stateSetter) => {
  stateSetter((prevState) => !prevState);
};

// full screen toggle
export const toggleFullScreen = (isFullScreen, setIsFullScreen) => {
  if (!isFullScreen) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
  toggleState(setIsFullScreen);
};

// change volume
export const handleVolumeChange = (e, stateSetter) => {
  stateSetter(parseFloat(e.target.value));
};

export const handleDocumentClick = (
  state,
  setState,
  className,
  excludedClassName,
  e,
) => {
  if (
    state &&
    !e.target.closest(className) &&
    !e.target.closest(excludedClassName)
  ) {
    setState(false);
  }
};

// function get video id from url (youtube)
export const getVideoIdByVideoUrl = (url) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/,
  );
  return match ? match[1] : null;
};

// functions support for control react play
export const handleNextSong = (audio, songPlay, handleClickSong) => {
  const currentIndex = audio.findIndex(
    (item) => (item.urlYoutube || item.media.url) === songPlay,
  );
  const nextIndex = currentIndex === audio.length - 1 ? 0 : currentIndex + 1;
  const nextSong = audio[nextIndex];
  if (nextSong) {
    const url = nextSong.urlYoutube ? nextSong.urlYoutube : nextSong.media.url;
    const isEmbed = nextSong.isEmbed;
    handleClickSong(url, isEmbed, nextSong, nextSong._id);
  }
};

export const handlePrevSong = (audio, songPlay, handleClickSong) => {
  const currentIndex = audio.findIndex(
    (item) => (item?.urlYoutube || item.media.url) === songPlay,
  );
  const prevIndex =
    currentIndex === -1
      ? 0
      : currentIndex === 0
        ? audio.length - 1
        : currentIndex - 1;
  const prevSong = audio[prevIndex];
  if (prevSong) {
    const url = prevSong.urlYoutube ? prevSong.urlYoutube : prevSong.media.url;
    const isEmbed = prevSong.isEmbed;
    handleClickSong(url, isEmbed, prevSong, prevSong._id);
  }
};

// functions support for infinite scroll
export const fetchData = (
  apiLink,
  setItems,
  items,
  setHasMore,
  page,
  accessToken,
  axiosJWT,
) => {
  const axiosToUse = axiosJWT || axios;
  axiosToUse
    .get(
      `${apiLink}?_page=${page.current}&_limit=5`,
      accessToken
        ? {
            headers: { token: `Bearer ${accessToken}` },
            'Content-Type': 'multipart/form-data',
          }
        : {},
    )
    .then((res) => {
      if (res.data.result.docs.length === 0) {
        setItems([...items]);
        setHasMore(false);
      } else {
        setItems([...items, ...res.data.result.docs]);
        setHasMore(res.data.result.docs.length === 5);
        page.current = page.current + 1;
      }
    });
};

export const refresh = (
  apiLink,
  setItems,
  setHasMore,
  page,
  accessToken,
  axiosJWT,
) => {
  page.current = 1;
  fetchData(apiLink, setItems, [], setHasMore, page, accessToken, axiosJWT);
};
