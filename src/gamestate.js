const gameState = {

  current: "INIT",
  clock: 1,
  wakeTime: -1, //-1 indicates that nothing is happening in this state. It can also be assigned as undefined

  tick(){
    this.clock++;
    //console.log("clock", this.clock);
    return this.clock;
  },

  startGame(){
  console.log("Hatching");
  this.current = "HATCHING";
  this.wakeTime = this.clock + 3;
  },

  wake(){
console.log("awoken");
this.current = "IDLING";
this.wakeTime = -1;
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
