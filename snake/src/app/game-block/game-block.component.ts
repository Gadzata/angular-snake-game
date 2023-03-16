import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-game-block',
  host: {
    class:'styleGameBlock'
  },
  templateUrl: './game-block.component.html',
  styleUrls: ['./game-block.component.scss']
})
export class GameBlockComponent {
  @HostBinding('class') classes = 'styleGameBlock';
}
