import { StudentDTO } from './../../../models/student';
import { Degree } from './../../../models/degree';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { DegreeService } from 'src/app/services/degree.service';
import { FormControl, Validators } from '@angular/forms';

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

  error: any = {
    message: ''
  };

  codeFormControl = new FormControl('', [Validators.minLength(60)]);
  codeInvalid: boolean = false;

  constructor(
    private service: DegreeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCode();
  }

  private findByCode(code: string): void {
    this.service.findByCode(code).subscribe({
      next: (res) => this.degree = res,
      error: (e) => this.error = e.error
    });
  }

  private getCode(): void {
    var code: string = "";
    this.route.params.subscribe(params => {
      code = params['code'];
    })
    console.log("código: "+code);
    this.findByCode(code);
  }

  public tryForInput(): void {
    if (this.codeFormControl.valid) {
      this.findByCode(this.codeFormControl.value);
      this.codeInvalid = false;
      this.error = {
        message: ''
      };
    } else {
      this.codeInvalid = true;
    }
  }

}
