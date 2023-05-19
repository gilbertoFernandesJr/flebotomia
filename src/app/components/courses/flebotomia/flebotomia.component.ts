import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flebotomia',
  templateUrl: './flebotomia.component.html',
  styleUrls: ['./flebotomia.component.scss']
})
export class FlebotomiaComponent implements OnInit {

  panelOpenState: boolean = false;
  showElementGeo: boolean = false;
  showElementRevel: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.showElementsToTop();
    this.fadeTextRevel();
  }

  public showElementsToTop(){
    //slide top of element 'Geo'
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.showElementGeo = true;
        }
      });
    }, {threshold: 1}); //Only show the element when all visible

    Array.from(document.querySelectorAll('.geo')).forEach(element => {
      observer.observe(element);
    });
  }

  public fadeTextRevel() {
    //Fade elements text
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.showElementRevel = true;
        }
      });
    }, {threshold: 1}); //Only show the element when all visible

    Array.from(document.querySelectorAll('.show-revel')).forEach(element => {
      observer.observe(element);
    });
  }
}
