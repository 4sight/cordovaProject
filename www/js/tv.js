let lastWeekTonight = new XMLHttpRequest();
	lastWeekTonight.open('GET', 'https://api.themoviedb.org/3/tv/60694?api_key=1e4974d6c175985b21f45395e63d5f95&language=en-US');
	lastWeekTonight.send();
	lastWeekTonight.onload = () => {
		if (lastWeekTonight.status === 200){
			let response = JSON.parse(lastWeekTonight.response);
			let div = document.getElementById('lastWeekTonight');
			console.log(response);
			if (response.next_episode_to_air === null){
				div.innerHTML += 'No next episode air date scheduled.';
			} else {
				div.innerHTML += response.next_episode_to_air;
			}
		} else {
			console.log(`error ${lastWeekTonight.status} ${lastWeekTonight.statusText}`);
		}
	}

let desusAndMero = new XMLHttpRequest();
	desusAndMero.open('GET', 'https://api.themoviedb.org/3/tv/84970?api_key=1e4974d6c175985b21f45395e63d5f95&language=en-US');
	desusAndMero.send();
	desusAndMero.onload = () => {
		if (desusAndMero.status === 200){
			let response = JSON.parse(desusAndMero.response);
			let div = document.getElementById('desusAndMero');
			console.log(response);
			if (response.next_episode_to_air === null){
				div.innerHTML += 'No next episode air date scheduled.';
			} else {
				div.innerHTML += response.next_episode_to_air;
			}
		} else {
			console.log(`error ${desusAndMero.status} ${desusAndMero.statusText}`);
		}
	}