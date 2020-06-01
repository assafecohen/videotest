import { getData } from './getData';
import Controllers from './Controllers';
import './main.css';
// App State
const state = {
  current: 0,
  isPlaying: true,
  isShuffle: false,
  crazyMode: false,
};
//Video
const video1 = document.getElementById('main_video');
//SetIntervalId
let setIntervalId;

// play_pause, nextVideo, prevVideo, shuffle, will be avaible inside Controllers
const controllers = new Controllers();

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
  ul.firstChild.classList.add('selected');
};
video1.addEventListener('ended', onEnded, false);

function onEnded() {
  state.current = controllers.nextVideo(
    state.current,
    state.currentList,
    video1
  );
}
function crazyMode() {
  state.crazyMode = !state.crazyMode;
  if (state.crazyMode) {
    (function loop() {
      const rand = Math.round(Math.random() * 10000);
      setIntervalId = setTimeout(function () {
        state.current = controllers.nextVideo(
          state.current,
          state.currentList,
          video1
        );
        crazyMode();
        loop();
      }, rand);
    })();
  } else {
    window.clearInterval(setIntervalId);
  }
}
window.addEventListener('DOMContentLoaded', (event) => {
  initialData();
});
document.getElementById('play_pause').addEventListener('click', (e) => {
  e.preventDefault();
  controllers.play_pause(state.isPlaying, video1);
  state.isPlaying = !state.isPlaying;
});
document.getElementById('crazy_mode').addEventListener('click', (e) => {
  e.preventDefault();
  if (state.crazyMode) {
    document.getElementById('crazy_mode').innerText = 'CrazyMode';
  } else {
    document.getElementById('crazy_mode').innerText = 'NormalMode';
  }
  crazyMode();
});
document.getElementById('next_video').addEventListener('click', (e) => {
  e.preventDefault();
  state.current = controllers.nextVideo(
    state.current,
    state.currentList,
    video1
  );
});
document.getElementById('prev_video').addEventListener('click', (e) => {
  e.preventDefault();
  state.current = controllers.prevVideo(
    state.current,
    state.currentList,
    video1
  );
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
});
