'use strict';

var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17
const GREEN = 21;
const  YELLOW = 19; 

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);

const iv =setInterval(function(){
    rpio.write(RED, rpio.read(RED)^1);
    rpio.write(GREEN, rpio.read(GREEN)^1);
    rpio.write(YELLOW, rpio.read(YELLOW)^1);
},200);

setTimeout(function(){
    clearInterval(iv);
    rpio.close(RED);
    rpio.close(GREEN);
    rpio.close(YELLOW);
},5000);