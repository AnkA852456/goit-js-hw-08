import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

const savedDuration = localStorage.getItem('videoplayer-current-time');
const parsedDuration = JSON.parse(savedDuration);
console.log(savedDuration, parsedDuration);

const onTimeupdate = function (e) {
  const videoDuration = { seconds: e.seconds };
  localStorage.setItem(
    'videoplayer-current-time',
    JSON.stringify(videoDuration.seconds)
  );
};

player.on('timeupdate', throttle(onTimeupdate, 1000));

player
  .setCurrentTime(parsedDuration)
  .then(function (seconds) {
    seconds = parsedDuration;
    console.log('the video was played');
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
