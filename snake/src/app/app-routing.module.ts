import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameBlockComponent } from './game-block/game-block.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
  {path:'snake', component:GameBlockComponent},
  {path:'ranking', component:RankingComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
