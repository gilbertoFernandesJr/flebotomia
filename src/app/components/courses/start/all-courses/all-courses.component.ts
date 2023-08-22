import { Component } from '@angular/core';
import { AllCoursesService } from 'src/app/services/all-courses.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent {

  constructor(private service: AllCoursesService) {}

  ngOnInit(): void {
    this.service.getCourses().subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error)
    })
  }
}
