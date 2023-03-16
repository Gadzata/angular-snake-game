export class Snake {
  snakeHeadX: number;
  snakeHeadY: number;
  snakeBody: number[][];
  directionX: number;
  directionY: number;
  constructor(blockSize: number) {
    this.snakeHeadX = 5 * blockSize;
    this.snakeHeadY = 5 * blockSize;
    this.snakeBody = [];
    this.directionX = 0;
    this.directionY = 0;
  }
}
