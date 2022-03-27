import { Component, OnInit } from '@angular/core';
import { faPaperPlane, faEnvelope, faPalette, faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGit, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-bottom-links',
  templateUrl: './bottom-links.component.html',
  styleUrls: ['./bottom-links.component.scss']
})
export class BottomLinksComponent implements OnInit {

  faUserCircle = faUserCircle
  faInstagram = faInstagram;
  faPaperPlane = faPaperPlane;
  faEnvelope = faEnvelope;
  faPalette = faPalette;
  faGit = faGit;
  faLinkedin = faLinkedin;

  ngOnInit(): void {
  }
}
