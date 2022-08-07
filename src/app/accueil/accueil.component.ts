import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

declare var $: any;
declare function sbadmin(): any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit, AfterViewInit {

  constructor() { }
  chart: any;

  ngOnInit(): void {
    Chart.defaults.font.family = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.color = '#858796';

    this.chart = document.getElementById("myChart")
    Chart.register(...registerables);
    this.loadChart();


  }


  loadChart(): void {
    new Chart(this.chart, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
          label: "Earnings",
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          tension: 0.3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          fill: {
            target: "origin",
            above: "rgba(78, 115, 223, 0.05)"
          }
        }]
      },

      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          x: {
            type: 'category',
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            ticks: {
              maxTicksLimit: 0
            },
            grid: {
              drawBorder: false,
              display: false
            }
          },
          y: {
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
            },
            grid: {
              color: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],

            }

          }
        },


        plugins: {
          legend: {
            display: false
          }
        }
      },

    });
  }

  ngAfterViewInit(): void {
  }

}
