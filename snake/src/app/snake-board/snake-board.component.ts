import { Component, HostListener } from "@angular/core";
import { ModalService } from "../service/modal.service";
import { ScoreServiceService } from "../service/player-service.service";
import { Router } from "@angular/router";
import { SnakeService } from "../service/snake.service";
import { Board } from "../board";
import { Player } from "../player";

@Component({
  selector: "app-snake-board",
  templateUrl: "./snake-board.component.html",
  styleUrls: ["./snake-board.component.scss"],
})
export class SnakeBoardComponent {
  gameBoard: Board = {
    blockSize: 0,
    rows: 0,
    columns: 0,
    board: undefined,
    context: undefined,
  };
  player: Player = new Player();
  bodyText = "";

  constructor(
    protected modalService: ModalService,
    private playerService: ScoreServiceService,
    private router: Router,
    private gameService: SnakeService
  ) {}

  ngOnInit(): void {
    this.getGame();
    this.getPlayer();
    this.gameBoard.board = document.getElementById("board")!!;
    this.gameBoard.board.height =
      this.gameBoard.rows * this.gameBoard.blockSize;
    this.gameBoard.board.width =
      this.gameBoard.columns * this.gameBoard.blockSize;
    this.gameBoard.context = this.gameBoard.board.getContext("2d");
    this.placeFood();

    setInterval(() => {
      this.player.name = this.bodyText;
      this.update(this.gameBoard.context);
    }, 1000 / 5);
  }

  getPlayer(): void {
    this.playerService
      .getPlayer()
      .subscribe((player) => (this.player = player));
  }
  getGame() {
    this.gameService
      .getGame()
      .subscribe((gameService) => (this.gameBoard = gameService));
  }

  update(contexts: any) {
    this.gameService.update(this.gameBoard.context);
  }

  placeFood() {
    this.gameService.placeFood();
  }

  @HostListener("window:keydown", ["$event"])
  onKeypress(e: KeyboardEvent) {
    this.gameService.onKeypress(e);
  }

  refreshPage() {
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }
}
