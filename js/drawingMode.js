export class DrawingMode{

  constructor(name,action){
    this.name = name;
    this.action = action;
  }

  execute(square,color){
    this.action(square,color);
  }
}