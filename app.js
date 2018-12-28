var app = angular.module("Hangman App", []);
app.controller("GameController", ['$scope', '$timeout', function($scope, $timeout){

	var words = ["rat", "cat", "bat", "mat"];
	$scope.wrongLetters = [];
	$scope.rightLetters = [];
	$scope.remainingGuesses = 6;
	$scope.displayWord = "";
	$scope.input = {
		letter: ""
	};

	// Select a random word
	var selectRandWord = function() {
		var index = Math.floor(Math.random() * words.length);
		return words[index];
	}

	// Start a new game: get a random word, and convert the mystery word into all asterisks (*)
	var newGame = function() {
		$scope.wrongLetters = [];
		$scope.rightLetters = [];
		$scope.remainingGuesses = 6;
		$scope.displayWord = "";

		selectedWord = selectRandWord();
		
		var tempDisplayWord = "";
		for(var i = 0; i < selectedWord.length; i++) {
			tempDisplayWord += "*";
		}

		$scope.displayWord = tempDisplayWord;
	}

	// Determine whether or not the player's input matches a letter in the mystery word
	$scope.letterChosen = function() {
		for(var i = 0; i < $scope.rightLetters.length; i++) {
			if($scope.rightLetters[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.input.letter = "";
				return;
			}
		}
		for(var i = 0; i < $scope.wrongLetters.length; i++) {
			if($scope.wrongLetters[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.input.letter = "";
				return;
			}
		}

		var correct = false;
		// Reveal each letter guessed correctly
		for(var i = 0; i < selectedWord.length; i++) {
			if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+1);
				correct = true;
			}
		}
		// Update the letters guessed
		if(correct) {
			$scope.rightLetters.push($scope.input.letter.toLowerCase());
		}
		else {
			$scope.wrongLetters.push($scope.input.letter.toLowerCase());
			$scope.remainingGuesses--;
		}
		$scope.input.letter = "";
		if($scope.remainingGuesses == 0) {
			alert("Game Over! You lose!");
			$timeout(function() {
				newGame();
			}, 500);
		}

		if($scope.displayWord.indexOf("*") == -1) {
			alert("Congratulations! You win!");
			$timeout(function() {
				newGame();
			}, 500);
		}
	}

	newGame();
}]);