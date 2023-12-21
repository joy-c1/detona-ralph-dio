const state = {
	view: {
		squares: document.querySelectorAll(".square"),
		enemy:document.querySelector(".enemy"),
		timeLeft: document.querySelector("#time-left"),
		score: document.querySelector("#score"),
		lives: document.querySelector("#lives"),
	},

	values: {
		timerId: null,
		gameSpeed: 1000,
		hitPosition: 0,
		result: 0,
		currentTime: 60,
		lives: 3,
	},

	actions: {
		countDownTimerId: setInterval(countDown, 1000),
	}
};

function playSound() {
	let audio = new Audio("./src/audios/hit.m4a");
	audio.volume = 0.1;
	audio.play();
}

function decreasesLives() {
	state.values.lives--;
	state.view.lives = state.values.lives;
}

function countDown() {
	state.values.currentTime--;
	state.view.timeLeft.textContent = state.values.currentTime;

	if (state.values.currentTime <= 0) { 
		clearInterval(state.actions.countDownTimerId);
		clearInterval(state.values.timerId);
		decreasesLives();
		alert('Fim da  partida! Pontuação atual: ' + state.values.result);
	}
}

function randomSquare(){

	state.view.squares.forEach((square)=> {
		square.classList.remove("enemy");
	})

	let randomNumber = Math.floor(Math.random() * 9);
	let randomSquare = state.view.squares[randomNumber];
	randomSquare.classList.add("enemy");
	state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
	state.values.timerId = setInterval(randomSquare, state.values.gameSpeed);
}

function addListenerHitBox() {
	state.view.squares.forEach((square)=> {
		square.addEventListener("mousedown", () => {
			if(square.id === state.values.hitPosition){
				state.values.result++;
				state.view.score.textContent = state.values.result;
				state.values.hitPosition = null;
				playSound();
			}
		});
	});
}

function init() {
	moveEnemy();
	addListenerHitBox();
}

init();