import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  styleButton = "margin: 45% 5% 0% 5%";
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.checkClicked = false;
  }
  title = "snake";
  checkClicked: boolean = false;
  snake() {
    this.checkClicked = true;
    this.styleButton = "margin: 9.45% 5% 0% 5%";
  }
  ranking() {
    this.checkClicked = true;
    this.styleButton = "margin: 22.45% 5% 0% 5%";
  }
}
