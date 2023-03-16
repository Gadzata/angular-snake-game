import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Board } from "../board";
import { Player } from "../player";
import { Snake } from "../snake";
import { ModalService } from "./modal.service";
import { ScoreServiceService } from "./player-service.service";

@Injectable({
  providedIn: "root",
})
export class SnakeService {
  boardBlock: Board = {
    blockSize: 25,
    rows: 20,
    columns: 20,
    board: undefined,
    context: undefined,
  };
  public score: number = 0;
  bodyText: string = "";
  snake = new Snake(this.boardBlock.blockSize);

  player: Player = new Player();

  foodX: number = this.boardBlock.blockSize * 5;
  foodY: number = this.boardBlock.blockSize * 5;

  gameOver: boolean = false;
  justAteFood: boolean = false;

  state = {};

  constructor(
    protected modalService: ModalService,
    private playerService: ScoreServiceService,
    private router: Router
  ) {
    this.getPlayer();
  }

  getPlayer(): void {
    this.playerService
      .getPlayer()
      .subscribe((player) => (this.player = player));
  }

  getGame(): Observable<Board> {
    const boardBlock = of(this.boardBlock);
    return boardBlock;
  }
  update(contexts: any) {
    if (this.gameOver) {
      return;
    }
    this.justAteFood = false;
    contexts.clearRect(
      0,
      0,
      this.boardBlock.board.width,
      this.boardBlock.board.height
    );
    contexts.fillStyle = "black";
    contexts.fillRect(
      0,
      0,
      this.boardBlock.board.width,
      this.boardBlock.board.height
    );

    this.snake.snakeHeadX += this.snake.directionX * this.boardBlock.blockSize;
    this.snake.snakeHeadY += this.snake.directionY * this.boardBlock.blockSize;

    contexts.fillStyle = "red";
    contexts.fillRect(
      this.foodX,
      this.foodY,
      this.boardBlock.blockSize,
      this.boardBlock.blockSize
    );

    if (
      this.snake.snakeHeadX == this.foodX &&
      this.snake.snakeHeadY == this.foodY
    ) {
      if (this.snake.directionX == -1) {
        this.snake.snakeBody.push([
          this.foodX + this.boardBlock.blockSize,
          this.foodY,
        ]);
      } else if (this.snake.directionX == 1) {
        this.snake.snakeBody.push([
          this.foodX - this.boardBlock.blockSize,
          this.foodY,
        ]);
      } else if (this.snake.directionY == -1) {
        this.snake.snakeBody.push([
          this.foodX,
          this.foodY + this.boardBlock.blockSize,
        ]);
      } else if (this.snake.directionY == 1) {
        this.snake.snakeBody.push([
          this.foodX,
          this.foodY - this.boardBlock.blockSize,
        ]);
      }
      this.snake.snakeBody.push([this.foodX, this.foodY]);
      this.justAteFood = true;
      this.player.score = this.player.score + 1;
      console.log(this.player.score);
      this.placeFood();
    }
    for (let i = this.snake.snakeBody.length; i > 0; i--) {
      this.snake.snakeBody[i] = this.snake.snakeBody[i - 1];
    }
    if (this.snake.snakeBody.length >= 1) {
      this.snake.snakeBody.pop();
    }

    if (this.snake.snakeBody.length) {
      this.snake.snakeBody[0] = [this.snake.snakeHeadX, this.snake.snakeHeadY];
    }

    contexts.fillStyle = "lime";
    contexts.fillRect(
      this.snake.snakeHeadX,
      this.snake.snakeHeadY,
      this.boardBlock.blockSize,
      this.boardBlock.blockSize
    );
    for (let i = 0; i < this.snake.snakeBody.length; i++) {
      contexts.fillRect(
        this.snake.snakeBody[i][0],
        this.snake.snakeBody[i][1],
        this.boardBlock.blockSize,
        this.boardBlock.blockSize
      );
    }

    if (
      this.snake.snakeHeadX < 0 ||
      this.snake.snakeHeadX >
        this.boardBlock.columns * this.boardBlock.blockSize - 1 ||
      this.snake.snakeHeadY < 0 ||
      this.snake.snakeHeadY >
        this.boardBlock.rows * this.boardBlock.blockSize - 1
    ) {
      this.gameOver = true;
      this.player.name = this.bodyText;
      this.modalService.open("modal-1");
    }
    for (let i = 1; i < this.snake.snakeBody.length; i++) {
      if (
        this.snake.snakeHeadX == this.snake.snakeBody[i][0] &&
        this.snake.snakeHeadY == this.snake.snakeBody[i][1] &&
        !this.justAteFood
      ) {
        this.gameOver = true;
        this.modalService.open("modal-1");
      }
    }
  }
  placeFood() {
    this.foodX =
      Math.floor(Math.random() * this.boardBlock.columns) *
      this.boardBlock.blockSize;
    this.foodY =
      Math.floor(Math.random() * this.boardBlock.rows) *
      this.boardBlock.blockSize;
  }

  onKeypress(e: KeyboardEvent) {
    if (e.key == "ArrowUp" && this.snake.directionY != 1) {
      this.snake.directionX = 0;
      this.snake.directionY = -1;
      this.update(this.boardBlock.context);
    } else if (e.key == "ArrowDown" && this.snake.directionY != -1) {
      this.snake.directionX = 0;
      this.snake.directionY = 1;
      this.update(this.boardBlock.context);
    }
    if (e.key == "ArrowLeft" && this.snake.directionX != 1) {
      this.snake.directionX = -1;
      this.snake.directionY = 0;
      this.update(this.boardBlock.context);
    }
    if (e.key == "ArrowRight" && this.snake.directionX != -1) {
      this.snake.directionX = 1;
      this.snake.directionY = 0;
      this.update(this.boardBlock.context);
    }
  }
}
