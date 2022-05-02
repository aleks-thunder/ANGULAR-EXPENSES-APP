import { Component, OnInit } from '@angular/core';
import { faPaperPlane, faEnvelope, faPalette, faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faGit, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-bottom-links',
  templateUrl: './bottom-links.component.html',
  styleUrls: ['./bottom-links.component.scss']
})
export class BottomLinksComponent implements OnInit {

  faPaperPlane = faPaperPlane;
  faUserCircle = faUserCircle
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faEnvelope = faEnvelope;
  faPalette = faPalette;
  faGit = faGit;

  ngOnInit(): void {
  }
}
