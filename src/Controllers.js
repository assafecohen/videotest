import { highlightCurrentPlaying } from './helper';

export default class Controllers {
  play_pause(isPlaying, video) {
    if (isPlaying) {
      video.pause();
      document.getElementById('play_pause').innerText = 'Play';
    } else {
      video.play();
      document.getElementById('play_pause').innerText = 'Pause';
    }
  }
  nextVideo(current, allVideos, video) {
    current++;
    if (current === allVideos.length) current = 0;
    video.setAttribute('src', allVideos[current].file);
    video.play();
    highlightCurrentPlaying(current);
    return current;
  }
  prevVideo(current, allVideos, video) {
    current--;
    if (current < 0) current = allVideos.length - 1;
    video.setAttribute('src', allVideos[current].file);
    video.play();
    highlightCurrentPlaying(current);
    return current;
  }
  shuffle(video, originalList, isShuffle) {
    let newList = [...originalList];

    if (!isShuffle) {
      newList = newList.sort(function () {
        document.getElementById('shuffle').innerText = 'Original';
        highlightCurrentPlaying(0);
        return 0.5 - Math.random();
      });
    }

    video.setAttribute('src', newList[0].file);
    highlightCurrentPlaying(0);
    video.play();

    return newList;
  }
}
