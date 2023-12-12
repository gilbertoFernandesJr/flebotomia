import { Component } from '@angular/core';
import { AnalyticService } from 'src/app/services/analytic.service';

@Component({
  selector: 'app-analytical',
  templateUrl: './analytical.component.html',
  styleUrls: ['./analytical.component.scss']
})
export class AnalyticalComponent {

  datasCompleted: boolean = false
  months: [{name: string, value: number}] = [{name: '', value: 0}];

  viewBar: [number, number] = [700, 400];


  // chart yeah options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Mês';
  showYAxisLabel = true;
  yAxisLabel = 'Faturamento R$';


  // chart Pie fer and geo
  showLabels: boolean = true;

  division: { name: string; value: number; }[] = [{name: '', value: 0}];
  viewPie: [number, number] = [400, 300];

  // chart registration more expenses
  monthsRegistration: [{name: string, value: number}] = [{name: '', value: 0}];
  totalExpenses: number = 0;
  divisionExpenses: { name: string; value: number; }[] = [{name: '', value: 0}];
  colorSchemePie = [
    {name: 'Custos', value: '#ffc107'}, {name: 'Lucro Matrículas', value: '#5aa9f9'}
  ];


  constructor(private analyticService: AnalyticService) {
    this.requestsBackEnd();
    this.IsCellPhone();
  }

  requestsBackEnd(): void {
    this.analyticService.findProfitMonthPaymentByMonth().subscribe({
      next: res => {
        this.months = res;
        this.division = this.calcDivisionThirtyPercent();
      },
      error: error => console.log(error),
      complete: () => this.datasCompleted = true
    });

    this.analyticService.findProfitRegistrationByMonth().subscribe({
      next: res => {
        this.monthsRegistration = res;
      },
      error: error => console.log(error)
    });

    this.analyticService.findExpenseByYear().subscribe({
      next: res => {
        this.totalExpenses = res.value;
        this.divisionExpenses = this.calcProfitBetweenRegistrationAndExpenses();
      },
      error: error => console.log(error)
    });
  }

  calcProfitBetweenRegistrationAndExpenses(): { name: string; value: number; }[] {
    return [
      {name: 'Custos', value: this.totalExpenses},
      {name: 'Lucro Matrículas', value: this.calcTotalRegistrations() - this.totalExpenses}
    ];
  }

  calcTotalRegistrations(): number {
    let total = 0;
    this.monthsRegistration.forEach(r => total += r.value);
    return total;
  }

  calcAvgRegistrationYear(): number {
    return this.calcTotalRegistrations() / 12;
  }

  calcDivisionThirtyPercent(): { name: string; value: number; }[] {
    return [
      {name: 'Fernandes', value: this.calcMoneyYear() * 0.3},
      {name: 'Geovanna', value: this.calcMoneyYear() * 0.7}
    ];
  }

  calcMoneyYear(): number {
    let total = 0;
    this.months.forEach(m => {
      total += m.value;
    });
    return total;
  }

  calcAvgYear(): number {
    return this.calcMoneyYear() / 12;
  }

  IsCellPhone(): void {
    // Reduce size of chart monthpayment by yeah
    const widthView = screen.width;
    if (widthView < 500) {
      this.viewBar = [350, 450];
      this.viewPie = [350, 300]
    }
  }

  onSelect(event: any) {
    console.log(event);
  }
}
