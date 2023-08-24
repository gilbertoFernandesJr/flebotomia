import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { AllCoursesService } from 'src/app/services/all-courses.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent {

  courses: Course[] = [];

  constructor(
    private service: AllCoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getCourses().subscribe({
      next: (res) => this.courses = res,
      error: (error) => console.log(error)
    })
  }

  public redirectToCourse(id: any, name: string): void {
    this.router.navigate([`courses/start/teams/${name}/${id}`]);
  }
}
