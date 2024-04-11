import axios from 'axios';

export const toggleState = (stateSetter) => {
  stateSetter((prevState) => !prevState);
};

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

export const getVideoIdByVideoUrl = (url) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/,
  );
  return match ? match[1] : null;
};

export const fetchData = (apiLink, setItems, items, setHasMore, page) => {
  axios.get(`${apiLink}?_page=${page.current}&_limit=5`).then((res) => {
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

export const refresh = (apiLink, setItems, setHasMore, page) => {
  page.current = 1;
  fetchData(apiLink, setItems, [], setHasMore, page);
};

export const handleDocumentClick = (state, setState, className, e) => {
  if (state && !e.target.closest(className)) {
    setState(false);
  }
};
