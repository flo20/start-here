import { SCENES, RAIN_CHANCE } from "./constants";
import { modFox, modScene } from "./ui";

const gameState = {

  current: "INIT",
  clock: 1,
  wakeTime: -1, //-1 indicates that nothing is happening in this state. It can also be assigned as undefined

  tick(){
    this.clock++;
   console.log("clock", this.clock);
    if(this.clock === this.wakeTime){
      this.wake();
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
console.log("awoken");
this.current = "IDLING";
this.wakeTime = -1;
modFox("idling");
this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
modScene(SCENES[this.scene]);

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
  }
}

//window.gameState = gameState;
export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
