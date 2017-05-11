let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('.timer__button');
const endTime = document.querySelector('.display__end-time');
buttons.forEach(button => button.addEventListener('click',() => timer(button.dataset.time)));

document.customForm.addEventListener('submit',function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins*60);
})

function timer(seconds){
	//setInterval is not reliable. Browser may top if tabbed away or inactive. OSX Safari scrolling interrupts it
	const now = Date.now();
	const then = now + seconds*1000; //now is in ms
	displayTimeLeft(seconds);
	displayEndTime(then);
	clearInterval(countdown);
	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now())/1000);
		if(secondsLeft < 0){
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	},1000);
}

function displayTimeLeft(seconds){
	const hours = Math.floor(seconds/3600);
	seconds %= 3600;
	const minutes = Math.floor(seconds/60);
	seconds %= 60;
	remainingText = `${(hours?hours+':':'')}${minutes+':'}${seconds<10?'0'+seconds:seconds}`
	document.title = remainingText;
	timerDisplay.textContent = remainingText;
}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${(hour>12?hour - 12:hour)}:${minutes<9?'0'+minutes:minutes} ${(hour>12?'P.M.':'A.M.')}`;
}