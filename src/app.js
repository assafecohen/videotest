import { getData } from './getData';
import Controllers from './Controllers';
import './main.css';
// App State
const state = { current: 0, isPlaying: true, isShuffle: false };
//Video
const video1 = document.getElementById('main_video');

// play_pause nextVideo prevVideo shuffle will be avaible inside Controllers
const controllers = new Controllers();
window.addEventListener('DOMContentLoaded', (event) => {
  initialData();
});
const initialData = async () => {
  state.originalData = await getData();
  state.currentList = [...state.originalData];
  video1.setAttribute('src', state.currentList[state.current].file);
  initializePlayList();
};
const initializePlayList = () => {
  const ul = document.getElementById('playlist');
  ul.innerHTML = '';
  for (let i = 0; i < state.currentList.length; i++) {
    let img = document.createElement('img');
    img.src = state.currentList[i].thumbnail;
    let li = document.createElement('li');
    li.id = i;
    li.appendChild(document.createTextNode(state.currentList[i].title));
    li.appendChild(img);
    ul.appendChild(li);
  }
  highlightCurrentPlaying();
};

video1.addEventListener('ended', onEnded, false);

function onEnded() {
  state.current = controllers.nextVideo(
    state.current,
    state.currentList,
    video1
  );
  highlightCurrentPlaying();
}
function highlightCurrentPlaying() {
  let currentVideo = document.getElementsByClassName('selected');
  currentVideo.length ? currentVideo[0].classList.remove('selected') : null;
  document.getElementById(state.current).classList.add('selected');
}
document.getElementById('play_pause').addEventListener('click', (e) => {
  e.preventDefault();
  controllers.play_pause(state.isPlaying, video1);
  state.isPlaying = !state.isPlaying;
});
document.getElementById('next_video').addEventListener('click', (e) => {
  e.preventDefault();
  state.current = controllers.nextVideo(
    state.current,
    state.currentList,
    video1
  );
  highlightCurrentPlaying();
});
document.getElementById('prev_video').addEventListener('click', (e) => {
  e.preventDefault();
  state.current = controllers.prevVideo(
    state.current,
    state.currentList,
    video1
  );
  highlightCurrentPlaying();
});
document.getElementById('shuffle').addEventListener('click', (e) => {
  e.preventDefault();
  state.currentList = controllers.shuffle(
    video1,
    state.originalData,
    state.isShuffle
  );
  state.current = 0;
  state.isShuffle = !state.isShuffle;

  initializePlayList();
  highlightCurrentPlaying();
});
