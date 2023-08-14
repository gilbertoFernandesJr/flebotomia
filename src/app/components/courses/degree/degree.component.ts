import { Degree } from './../../../models/degree';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DegreeService } from 'src/app/services/degree.service';
import { UntypedFormControl, Validators } from '@angular/forms';

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

  codeFormControl = new UntypedFormControl('', [Validators.minLength(60), Validators.required]);
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
    this.findByCode(code);
  }

  public tryForInput(): void {
    if (this.codeFormControl.valid) {
      this.error = {
        message: ''
      };
      this.codeInvalid = false;
      this.findByCode(this.codeFormControl.value);
    } else {
      this.codeInvalid = true;
    }
  }

}
