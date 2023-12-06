import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { StudentsByTeamComponent } from './studentsByTeam/students-by-team.component';
import { StudentByTeamComponent } from './studentByTeam/student-by-team.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStudentTeamDialogComponent } from './dialogs/add-student-team-dialog/add-student-team-dialog.component';
import { AddTeamDialogComponent } from './dialogs/add-team-dialog/add-team-dialog.component';
import { UserComponent } from './user/user.component';
import { AnalyticalComponent } from './analytical/analytical.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ExpenseComponent } from './expense/expense.component';
import { AddExpenseDialogComponent } from './dialogs/add-expense-dialog/add-expense-dialog.component';
import { UpdateExpenseDialogComponent } from './dialogs/update-expense-dialog/add-expense-dialog.component';
import { StudentsComponent } from './students/students.component';



@NgModule({
  declarations: [
    StartComponent,
    AllCoursesComponent,
    TeamsComponent,
    TeamComponent,
    StudentsByTeamComponent,
    StudentByTeamComponent,
    AddStudentTeamDialogComponent,
    AddTeamDialogComponent,
    UserComponent,
    AnalyticalComponent,
    ExpenseComponent,
    AddExpenseDialogComponent,
    UpdateExpenseDialogComponent,
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    AppMaterialModule,
    SharedModule,
    NgxMaskModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class StartModule { }
