import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { LoaderService } from "@services/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent implements OnInit {
  show: boolean = false;

  constructor(private loaderService: LoaderService, private CDR: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loaderService.getSpinnerObserver().subscribe(status => {
      this.show = status === true;
    });
  }
}
