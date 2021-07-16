const gameState = {

  current: "INIT",
  clock: 1,
  tick(){
    this.clock++;
    //console.log("clock", this.clock);
    return this.clock;
  },
  
  handleUserAction(icon){
    // eslint-disable-next-line no-console
    console.log(icon);
  }
}


export default gameState;
