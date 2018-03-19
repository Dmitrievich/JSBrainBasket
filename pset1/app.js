'use strict';

const readlineSync = require('readline-sync');

let numberOfBulls = 0;
let numberOfCows = 0;

let historyBulls = [];
let historyCows = [];
let history = [];

let userNumber;


// Random Digit func from 0 to 9
function rndValue() {
    return Math.floor(Math.random() * 10);
};


function generateSecret() {
    let secretNumber = [rndValue()];
    let tempNum;

    while (secretNumber.length !== 4) {
        tempNum = rndValue();
        
        if (secretNumber.indexOf(tempNum) === -1) {
            secretNumber.push(tempNum);
        }
    }
    return secretNumber.join('');
};

let secretNumber = generateSecret();
// console.log(secretNumber);


// User's input filter:
function readLn(str) {
	let userNumber;
    let state = true;
    
    while (state) {
        userNumber = readlineSync.question(str);
        
        console.clear();            // Clean Screen
        showTable();                // 

        if ( !( isNaN(parseInt(userNumber)) ) ) {           // isNaN?
            if ( (userNumber.length === 4) ) {              // have 4 digits?
                for (let i = 0; i < 4; i++) {               // are digits different
                    if ( userNumber.lastIndexOf(userNumber[i]) !== i ) {
                        state = true;
                        break;
                    } else {
                        state = false;
                    }
                }
            }            
        }
    }
	return userNumber.toString();
};


// Check a result
function guess() {
    if ( secretNumber == userNumber ) {
        numberOfBulls = 4;
        return 0;           //Win
    } 
    
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (secretNumber[i] == userNumber[j]) {
                numberOfCows += 1;
            }
        }
    }

    for (let i = 0; i < 4; i ++) {
        if (secretNumber[i] == userNumber[i]) {
            numberOfCows -= 1;
            numberOfBulls += 1;
        }
    }
    return 1;           //Next step
};


// The table with results
function showTable() {
    for (let i = 0; i < history.length; i++ ) {
        console.log(' | ' + (i+1)  + ' | ' + history[i] + ' | Bulls: ' + historyBulls[i] + ' | Cows: ' + historyCows[i] + ' | ');
    }
};


// Start of the Game
let runGame = true;

while(runGame) {

    userNumber = readLn('Guess the four-digit number: ');
    console.clear();
    runGame = guess();

    history.push(userNumber);
    historyBulls.push(numberOfBulls);
    historyCows.push(numberOfCows);    
    
    showTable();

    numberOfCows = 0;
    numberOfBulls = 0;

    if (!runGame) {
        console.log('The Number was: ', secretNumber + '. You Win!');
    }
};
