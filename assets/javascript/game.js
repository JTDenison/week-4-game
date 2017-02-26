$(document).ready(function() {
	console.log( "ready!" );

	var myChar;
	var enemyChar;
	var charArray;
	var wins = 0;
	var loses = 0;
	var haveAttacker;
	var haveDefender;
	var rounds;
	var numEnemies;



	function startGame() {
		myChar;
		enemyChar;
		choices = [];

			charArray = [
			{id: 0,
			name:"Luke Skywalker",
			healthPower: 120,
			attackPower: 20,
			image:'assets/images/luke_anh2.jpg'
		},
			{
			id: 1,
			name:"Darth Vader",
			healthPower: 150,
			attackPower: 7,
			image:'assets/images/dv.jpg'
		},
			{
			id: 2,
			name:"Yoda",
			healthPower: 100,
			attackPower: 25,
			image:'assets/images/yoda.jpg'
		},	{
			id: 3,
			name: "Darth Maul",
			healthPower: 130,
			attackPower:14,
			image:'assets/images/Darth_Maul.png'
		}];
		
		
		haveAttacker = false;
		numEnemies = 3;
		haveDefender = false;
		rounds = 5;
		
		for(var i = 0; i < charArray.length; i++) {
			choices += "<div id=" + charArray[i].id + " class='btn character text-center' value=" + charArray[i].id +
			"><img class='pic' src=" + charArray[i].image + " alt=" + charArray[i].name + "><br> HP: " + charArray[i].healthPower +
			"<br> Atk: " + charArray[i].attackPower + " </div>";
		}

		$("#picking").html(choices);
		$("#mainPhase").html("Click to choose your character");
		$('.myHero').remove();
		$('.fighting').remove();
		$('#attackPhase').html("");

		moveCharONclick();
	}

	function listChar() {
		var myHero = "<div id=" + charArray[myChar].id + " class='btn character text-center myHero' value=" + charArray[myChar].id +
			"><img class='pic' src=" + charArray[myChar].image + " alt=" + charArray[myChar].name + "><br> HP: " + charArray[myChar].healthPower +
			"<br> Atk: " + charArray[myChar].attackPower + " </div>";
		var badGuy = "<div id=" + charArray[enemyChar].id + " class='btn character text-center fighting' value=" + charArray[enemyChar].id +
			"><img class='pic' src=" + charArray[enemyChar].image + " alt=" + charArray[enemyChar].name + "><br> HP: " + charArray[enemyChar].healthPower +
			"<br> Atk: " + charArray[enemyChar].attackPower + " </div>";
		$('#myHero').html(myHero);
		$('#enemy').html(badGuy);
	}

	function attackPhase() {
		var atkText = "You attack " + charArray[enemyChar].name + " for " + charArray[myChar].attackPower + " damage!<br>" +
			charArray[enemyChar].name + " counter attacks for " + charArray[enemyChar].attackPower + " damage!<br>" +
			"Your attack power has increased by " + rounds + "!";
		$('#attackPhase').html(atkText);
	}


	// user character Selection

	function moveCharONclick() {
		$('.character').on("click", function(){
			if(!haveDefender) {	
				myChar = $(this).attr('id');
				$("#myHero").append(this);
				$(this).addClass("myHero");

				haveDefender = true;
				$('#attackPhase').html("");
				$("#mainPhase").html("Choose your opponent!");
			}


// IF user has character, then pick opponent



			else if(!haveAttacker && haveDefender && myChar !== $(this).attr('id')) {	
				enemyChar = $(this).attr('id');
				$("#enemy").append(this);
				$(this).addClass("fighting");

				haveAttacker = true;
				$('#attackPhase').html("");
				$("#mainPhase").html("Click the Attack button Karate Chop!");
			}
		});
	}

	$('#attack').on("click", function() {
		if(!haveDefender) {
			$('#attackPhase').html("You need to pick your character first!");
		}
		else if(!haveAttacker) {
			$('#attackPhase').html("Pick who you are fighting!");
		}   // damage swap
		else if(haveDefender && haveAttacker) {
			rounds++;
			charArray[enemyChar].healthPower  = charArray[enemyChar].healthPower - charArray[myChar].attackPower;	
			charArray[myChar].healthPower = charArray[myChar].healthPower - charArray[enemyChar].attackPower;	


			if(charArray[enemyChar].healthPower < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					$('#attackPhase').html("");
					$("#mainPhase").html("Who will you fight next?");
					haveAttacker = false;
				}
				else {
					attackPhase();
					alert("You win the battle!!");
					wins++;
					$('.winsLoses').html("Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
					startGame();
				}
				
			}
			else if(charArray[myChar].healthPower < 0) {
				attackPhase();
				alert("You got PWNED! NOOB");
				loses++;
				$('.winsLoses').html("Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
				startGame();
			}
			else {
				attackPhase();
				listChar();
			}

			charArray[myChar].attackPower = charArray[myChar].attackPower + rounds;	//Get Stronger
		}
	});

	$('#reset').on("click", function(){
		startGame();
	});


moveCharONclick();
	startGame();



startGame();

});

