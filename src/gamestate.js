import { SCENES, RAIN_CHANCE,  DAY_LENGTH, NIGHT_LENGTH, getNextDieTime, getNextHungerTime } from "./constants";
import { modFox, modScene } from "./ui";

const gameState = {

  current: "INIT",
  clock: 1,
  wakeTime: -1, //-1 indicates that nothing is happening in this state. It can also be assigned as undefined
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,

  tick(){
    this.clock++;
   console.log("clock", this.clock);
    if(this.clock === this.wakeTime){
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    }
    return this.clock;
  },

  startGame(){
  //console.log("Hatching");
  this.current = "HATCHING";
  this.wakeTime = this.clock + 3;
  modFox("egg");
  modScene("day");
  },

  wake(){
//console.log("awoken");
this.current = "IDLING";
this.wakeTime = -1;
modFox("idling");
this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
modScene(SCENES[this.scene]);

this.hungryTime = getNextHungerTime(this.clock);
this.sleepTime = this.clock + DAY_LENGTH;
  },


  handleUserAction(icon){
    if(["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)){
      //do nothing in these states
    }
    if(this.current === "INIT" || this.current === "DEAD"){
      this.startGame();
      return;
    }
  
  switch (icon) {
    case "weather":
      this.changeWeather();
      break;
      case "poop":
        this.changePoop();
        break;
      case "fish":
      this.feed();
      break;
  }
    },
    changeWeather() {
      console.log("Change weather");
    },
    changePoop() {
      console.log("Clean poop");
    },
    feed() {
      console.log("Feed");
      if(this.current !== "HUNGRY"){
        return;
      }

      this.current = "FEEDING";
      this.dieTime = -1;   
      this.poopTime = getNextPoopTime(this.clock);
      modFox("eating");
      this.timeToStartCelebrating = this.clock + 2;
    
    },

  sleep() {
    this.current = "SLEEP";
    modFox("sleep");
    modScene("night");
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },

  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  die() {
    console.log("die");
  },

}

//window.gameState = gameState;
export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
