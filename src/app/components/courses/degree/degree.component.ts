import { StudentDTO } from './../../../models/student';
import { Degree } from './../../../models/degree';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { DegreeService } from 'src/app/services/degree.service';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {

  degree: Degree = {
    id: '',
    code: '',
    dateGeneration: '',
    studentDTO: {
      name: '',
      cpf: ''
    }
  }

  constructor(
    private service: DegreeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCode();
    console.log("CHEGUEI AO DEGREE COMPONENT");
  }

  findByCode(code: string) {
    this.service.findByCode(code).subscribe(response => {
      this.degree = response;
    })
  }

  private getCode() {
    var code: string = "";
    this.route.params.subscribe(params => {
      code = params['code'];
    })
    console.log("código: "+code);
    this.findByCode(code);
  }

}
