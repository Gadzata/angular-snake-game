import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { Player } from "../player";

import { ModalService } from "../service/modal.service";
import { ScoreServiceService } from "../service/player-service.service";

@Component({
  selector: "jw-modal",
  templateUrl: "modal.component.html",
  styleUrls: ["modal.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;
  private element: any;
  player: Player = new Player();
  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private scoreService: ScoreServiceService,
    private router: Router
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.modalService.add(this);
    this.getPlayer();
    document.body.appendChild(this.element);

    this.element.addEventListener("click", (el: any) => {
      if (el.target.className === "jw-modal") {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    this.modalService.remove(this);
    this.element.remove();
  }

  open() {
    this.element.style.display = "block";
    document.body.classList.add("jw-modal-open");
    this.isOpen = true;
  }

  close() {
    this.element.style.display = "none";
    document.body.classList.remove("jw-modal-open");
    this.isOpen = false;
  }
  getPlayer(): void {
    this.scoreService.getPlayer().subscribe((player) => (this.player = player));
  }

  saveUser() {
    console.log(this.player);
    this.router.navigate(["/ranking"]);
  }
}
