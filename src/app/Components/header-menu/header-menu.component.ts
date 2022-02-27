import { Component, OnInit } from '@angular/core';
import { faPaperPlane, faEnvelope, faPalette } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGit, faLinkedin } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  faInstagram = faInstagram;
  faPaperPlane = faPaperPlane;
  faEnvelope = faEnvelope;
  faPalette = faPalette;
  faGit = faGit;
  faLinkedin = faLinkedin;
  constructor() { }

  ngOnInit(): void {
  }

}
