const fs = require('fs');

let code = fs.readFileSync('main.bf');
let storage = [0];
let currentLocation = 0;
let ignoreCode = false;
let lastOpenWhile = [];

let splitTxt = code.toString().split('');

let chars = require('./chars.json')

let runChar = ( num ) => {
    let char = splitTxt[num];

    if(ignoreCode === false){
        if(char === ">"){
            currentLocation++;
            if(!storage[currentLocation])storage[currentLocation] = 0;
        }
    
        if(char === "<"){
            currentLocation--;
            if(!storage[currentLocation])storage[currentLocation] = 0;
        }
    
        if(char === "+"){
            storage[currentLocation]++;
        }
    
        if(char === "-"){
            storage[currentLocation]--;
        }
    
        if(char === "."){
            console.log(storage[currentLocation])
            try{console.log(chars.find(x => x.code === storage[currentLocation].toString()).dec)}catch(e){}
        }

        if(char === "|"){
            
        }
    
        if(char === "["){
            lastOpenWhile.push(num);

            if(storage[currentLocation] === 0){
                ignoreCode = true;
            }
        }
    }

    if(char === "]"){
        ignoreCode = false;

        if(storage[currentLocation] > 1){
            if(lastOpenWhile.length > 0){
                lastOpenWhile.reverse();
                lastOpenWhile.shift();
                lastOpenWhile.reverse();

                process.nextTick(() => {runChar(lastOpenWhile[lastOpenWhile.length - 1]);})
            } else{
                throw new Error("No open while loop");
            }
        } else{
            if(splitTxt[num + 1])
            process.nextTick(() => {runChar(num + 1);})
        }
    } else{
        if(splitTxt[num + 1])
        process.nextTick(() => {runChar(num + 1);})
    }
}

runChar(0)