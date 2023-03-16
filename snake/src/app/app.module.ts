import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ModalComponent } from "./modal/modal.component";
import { SnakeBoardComponent } from "./snake-board/snake-board.component";
import { GameBlockComponent } from "./game-block/game-block.component";
import { RankingComponent } from "./ranking/ranking.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DetailsComponent } from "./game-details/details.component";

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    SnakeBoardComponent,
    GameBlockComponent,
    RankingComponent,
    DetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
