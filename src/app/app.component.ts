import { Component } from '@angular/core';
import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor() { }

  ngOnInit(): void {
    // inject(); //Vercel Web Analytics
  }
}
