import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = 'flebotomia';
  panelOpenState: boolean = false;
  showElement: boolean = false;
  showCount: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.showElementsToTop();
  }

  public showElementsToTop(){
    //slide top of element 'Geo'
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.showElement = true;
          console.log("Elemento show");
        }
      });
    }, {threshold: 1}); //Only show the element when all visible

    Array.from(document.querySelectorAll('.geo')).forEach(element => {
      observer.observe(element);
    });
  }

  /*
  //FIX chrome
  public showElementsToTop(){
    //slide top of elements 'to whon'
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && this.showCount < 2) {
          this.showCount += 1;
          if (this.showCount <= 2){
            this.showElement = true;
          }
          console.log("Elemento show");
        }else {
          if (this.showCount == 1) {
            this.showElement = false
          }
        }
      });
    }, {threshold: 1}); //Only show the element when all visible

    Array.from(document.querySelectorAll('.geo')).forEach(element => {
      observer.observe(element);
    });
  }*/
}
