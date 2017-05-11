const player = {};
	player.container = document.querySelector('.player');
	player.video = player.container.querySelector('video.player__video');
	player.playButton = player.container.querySelector('.player__button.toggle');
	player.skipButtons = player.container.querySelectorAll('.player__button[data-skip]');
	player.progress = player.container.querySelector('.progress');
	player.currentProgress = player.container.querySelector('.progress__filled');
	player.volume = player.container.querySelector('input[name="volume"]');
	player.rate = player.container.querySelector('input[name="playbackRate"]');
	player.fullscreen = player.container.querySelector('.player__button-fullscreen');

player.playButton.addEventListener('click',playPause);
player.video.addEventListener('click',playPause);
player.video.addEventListener('timeupdate',update);

let mousedown = false;
player.progress.addEventListener('click',dragSkip);
player.progress.addEventListener('mousemove', (e) => mousedown && dragSkip(e));
player.progress.addEventListener('mousedown',() => mousedown = true);
player.progress.addEventListener('mouseup',() => mousedown = false);

player.volume.addEventListener('input',setVolume);
player.rate.addEventListener('input',setRate);

player.skipButtons.forEach(button => button.addEventListener('click',skip))

player.fullscreen.addEventListener('click',toggleFull);

function update()
{
	player.currentProgress.style.flexBasis = `${this.currentTime/this.duration * 100}%`;
}

function playPause(e)
{
	player.video.paused ? play() : pause();
}

function dragSkip(e)
{
	player.video.currentTime = (e.offsetX / player.progress.offsetWidth) * player.video.duration;
}

function play()
{
	player.video.play();
	player.playButton.innerHTML = '| |';
}

function pause()
{
	player.video.pause();
	console.log('pause');
	player.playButton.innerHTML = '►';
}

function skip(e)
{
	var skip = parseInt(this.dataset.skip);
	player.video.currentTime = (player.video.currentTime + skip >= 0) ? (player.video.currentTime + skip) : 0;
}

function setVolume(e)
{
	player.video.volume = this.value;
}

function setRate(e)
{
	player.video.playbackRate = this.value;
}

function toggleFull(e)
{
	if (player.video.requestFullscreen) {
	  player.video.requestFullscreen();
	} else if (player.video.msRequestFullscreen) {
	  player.video.msRequestFullscreen();
	} else if (player.video.mozRequestFullScreen) {
	  player.video.mozRequestFullScreen();
	} else if (player.video.webkitRequestFullscreen) {
	  player.video.webkitRequestFullscreen();
	}
}

console.log(player);