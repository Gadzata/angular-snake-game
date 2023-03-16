export class Player {
  name: string;
  score: number;
  timerSeconds: number;
  constructor() {
    this.score = 0;
    this.timerSeconds = 0;
    this.name = "";
  }

  setName(n: string) {
    this.name = n;
  }
  setScore(sc: number) {
    this.score = sc;
  }
  setTimer(t: number) {
    this.timerSeconds = t;
  }
}
