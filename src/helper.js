export const highlightCurrentPlaying = (current) => {
  let currentVideo = document.getElementsByClassName('selected');
  currentVideo.length ? currentVideo[0].classList.remove('selected') : null;
  document.getElementById(current).classList.add('selected');
};
