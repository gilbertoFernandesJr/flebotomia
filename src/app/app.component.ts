import { Component } from '@angular/core';
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = 'flebotomia';
  panelOpenState: boolean = false;
  showElementGeo: boolean = false;
  showElementRevel: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.showElementsToTop();
    this.fadeTextRevel();
    inject(); //Vercel Web Analytics
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
