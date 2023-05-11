import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flebotomia',
  templateUrl: './flebotomia.component.html',
  styleUrls: ['./flebotomia.component.scss']
})
export class FlebotomiaComponent implements OnInit {

  title: string = 'flebotomia';
  panelOpenState: boolean = false;
  showElement: boolean = false;

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
        }
      });
    }, {threshold: 1}); //Only show the element when all visible

    Array.from(document.querySelectorAll('.geo')).forEach(element => {
      observer.observe(element);
    });
  }

}
