import { Component } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Player } from "../player";
import { ScoreServiceService } from "../service/player-service.service";

@Component({
  selector: "app-ranking",
  templateUrl: "./ranking.component.html",
  styleUrls: ["./ranking.component.scss"],
})
export class RankingComponent {
  player: Player = new Player();
  constructor(
    private httpService: HttpClient,
    private playerService: ScoreServiceService
  ) {}
  arr: any = [];

  ngOnInit() {
    this.getPlayer();
    this.httpService.get("../assets/json/jsonRankings.json").subscribe({
      next: (data) => {
        this.arr = data as string[]; // populate array with data.
        console.log(this.arr); // show data in console window.
      },
      error: (HttpErrorResponse) => {
        console.log(HttpErrorResponse.message); // show error message, if any.
      },
    });
    this.arr.push(this.player);
    console.log(this.arr);
  }
  getPlayer(): void {
    this.playerService
      .getPlayer()
      .subscribe((player) => (this.player = player));
  }
}
