import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from '../player';

@Injectable({
  providedIn: 'root'
})
export class ScoreServiceService {

  player: Player;
  constructor() {
    this.player = new Player();
   }

  getPlayer(): Observable<Player> {
    const player = of(this.player);
    return player;
  }
}
