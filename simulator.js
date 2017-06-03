function startSimulation() {
	var nr1 = document.getElementById("neutralRate1").value;
	var wc1 = document.getElementById("winCount1").value;
	var nr2 = document.getElementById("neutralRate2").value;
	var wc2 = document.getElementById("winCount2").value;
	var gc = document.getElementById("gameCount").value;
	runSimulation(Number(nr1),Number(wc1),Number(nr2),Number(wc2),Math.floor(Number(gc)));
}

function runSimulation(winP1, numWin1, winP2, numWin2, gameCount) {
	var loopCount;
	var rand;
	var stocks1;
	var stocks2;
	var gameWins1 = 0;
	var gameWins2 = 0;
	var neutralWins1 = 0;
	var neutralWins2 = 0;
	
	if(winP1 > 1 || winP1 < 0 || winP2 > 1 || winP2 < 0) {
		printToTextBox("ERROR: Neutral win rates must be between 0 and 1 (inclusive).")
		return null;
	}
	
	if((winP1 + winP2) != 1) {
		printToTextBox("ERROR: Neutral win rates must add up to 1.");
		printToTextBox("Win rate 1: " + winP1 + ". Win rate 2: " + winP2 + ". SUM: " + (winP1 + winP2));
		return null;
	}
	
	if(numWin1 < 1 || numWin2 < 1) {
		printToTextBox("ERROR: Average neutral wins per stock must be at least 1.");
	}
	
	if(numWin1 > 100 || numWin2 > 100) {
		printToTextBox("ERROR: Average neutral wins per stock must be no more than 100.");
	}
	
	if(gameCount > 1000000) {
		printToTextBox("ERROR: Number of games too high (max. 1000000).")
		return null;
	}
	
	if(gameCount < 1) {
		printToTextBox("ERROR: Number of games too low (min. 1).")
		return null;
	}
	
	for(i = 0; i < gameCount; i++) {
		loopCount = 0;
		stocks1 = 3;
		stocks2 = 3;
		neutralWins1 = neutralWins1 % 1;
		neutralWins2 = neutralWins2 % 1;
		do {
			rand = Math.random();
			if(winP1 > rand) {
				neutralWins1++;
			} else {
				neutralWins2++;
			}
			if(neutralWins1 >= numWin1) {
				neutralWins1 -= numWin1;
				stocks2--;
			}
			if(neutralWins2 >= numWin2) {
				neutralWins2 -= numWin2;
				stocks1--;
			}
			loopCount++;
		} while (stocks1 > 0 && stocks2 > 0 && loopCount < 1000);
		if(loopCount >= 1000) {
			printToTextBox("Loop ran too long. Canceling simulation.")
			return null;
		}
		if(stocks1 == 0) {
			gameWins2++;
		} else if(stocks2 == 0) {
			gameWins1++;
		}
	}
	printToTextBox("P1 Wins: " + gameWins1 + " - P2 Wins: " + gameWins2 + "  (" + winP1 +", "+ numWin1 +", "+ winP2 +", "+ numWin2 +", "+ gameCount + ")");
}

function printToTextBox(text) {
	var div = document.getElementById("textBox");
	div.value = div.value + "\n" + text;
	div.scrollTop = div.scrollHeight;
}