import { Component } from '@angular/core';
import { AnalyticService } from 'src/app/services/analytic.service';

@Component({
  selector: 'app-analytical',
  templateUrl: './analytical.component.html',
  styleUrls: ['./analytical.component.scss']
})
export class AnalyticalComponent {

  datasCompleted: boolean = false
  months: any = [];

  view: [number, number] = [700, 400];


  // chart yeah options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Mês';
  showYAxisLabel = true;
  yAxisLabel = 'Faturamento R$';

  constructor(private analyticService: AnalyticService) {
    this.analyticService.findProfitMonthPaymentByMonth().subscribe({
      next: res => this.months = res,
      error: error => console.log(error),
      complete: () => this.datasCompleted = true
    });
    this.IsCellPhone();
  }

  IsCellPhone(): void {
    // Reduce size of chart monthpayment by yeah
    const widthView = screen.width;
    if (widthView < 500) this.view = [350, 450];
  }

  onSelect(event: any) {
    console.log(event);
  }
}
