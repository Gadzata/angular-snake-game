import { Component } from "@angular/core";
import { Player } from "../player";
import { ScoreServiceService } from "../service/player-service.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent {
  timerSeconds: number = 0;
  player: Player = new Player();
  constructor(private scoreService: ScoreServiceService) {}

  ngOnInit(): void {
    this.getPlayer();
    setInterval(() => {
      this.timerSeconds = this.timerSeconds + 1;
      this.player.setTimer(this.timerSeconds);
    }, 1000);
  }

  getPlayer(): void {
    this.scoreService.getPlayer().subscribe((player) => (this.player = player));
  }
}
