import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonTabButton, IonTabBar, IonIcon, IonBadge, IonButton, IonSegmentButton, IonSegment, IonCardContent, IonChip, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonList, IonItem, IonLabel, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FormsModule } from '@angular/forms';
import { checkmarkDone, home, personOutline, notifications,locationOutline } from 'ionicons/icons';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { Color, ScaleType } from '@swimlane/ngx-charts';

import { single } from '../data';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonProgressBar, IonLabel, IonItem, IonList, IonCardHeader,NgxChartsModule, IonCard, IonCol, IonRow, IonGrid, IonChip, IonCardContent, IonSegment, IonSegmentButton, IonButton, IonBadge, IonIcon, IonTabBar, IonTabButton, IonHeader, IonToolbar, IonContent, IonFooter, CommonModule,FormsModule],
})
export class HomePage implements OnInit {
  constructor() {
    addIcons({ checkmarkDone, home, personOutline, notifications, locationOutline });
  Object.assign(this, { single });
  }
  tab = 'delivery';
    heatMaps: string[] = ['red', 'amber', 'green'];

 segment: string = 'delivery';
  notificationsCount = 5;
  selectedBranch = 'DELHI-11';
   getHappinessFace(): string {
    if (this.heatMaps.includes('red')) {
      return '😠';  
    } else if (this.heatMaps.includes('amber')) {
      return '🙂'; 
    } else if (this.heatMaps.every(color => color === 'green')) {
      return '😃';  
    }
    return '😐';  
  }

  //   {
  //     name: 'DWARKA',
  //     waybillCount: 10,
  //     packageCount: 50,
  //     totalWeight: 1.2,
  //     lyingTimeHours: 20, // less than 24 => Green route
  //     isActive: true,
  //   },
  //   {
  //     name: 'KAROLBAGH',
  //     waybillCount: 12,
  //     packageCount: 60,
  //     totalWeight: 2.5,
  //     lyingTimeHours: 30, // more than 24 => Amber route
  //     isActive: true,
  //   },
  //   // Additional routes...
  // ];

  hoveredRoute: any = null;

  routes: any[] = [
    {
      name: 'DWARKA',
      waybillCount: 10,
      packageCount: 50,
      totalWeight: 1.2,
      lyingTimeHours: 20, // less than 24 => Green route
      isActive: true,
    },
    {
      name: 'KAROLBAGH',
      waybillCount: 12,
      packageCount: 60,
      totalWeight: 2.5,
      lyingTimeHours: 30, // more than 24 => Amber route
      isActive: true,
    },
    // Additional routes...
  ];

  totalWaybills = this.routes.reduce((sum, b) => sum + b.waybillCount, 0);
  totalWeight = Number(this.routes.reduce((sum, b) => sum + b.totalWeight, 0).toFixed(1));
  totalTon = Math.ceil(this.totalWeight / 1000);

  tripStatus = [
    { vehicleNo: '1234', ofdCount: 16, totalWaybills: 20, lastUpdate: new Date('2024-08-18T12:00:00') },
    { vehicleNo: '4321', ofdCount: 11, totalWaybills: 17, lastUpdate: new Date('2024-08-18T14:00:00') },
    // More vehicles
  ];

  absentVehicles = [
    { vehicleNo: '1654' },
    { vehicleNo: '1218' },
  ];

  toBeCollectedAmount = 52348;
  pendingPODCount = 3;
  marketVehicleUsage = 3;
  safedropUsage = 76;

  // Monthly snapshot
  months = [
    { label: 'Aug-24', value: '2024-08' },
    { label: 'Sep-24', value: '2024-09' },
    // Past months
  ];
  selectedMonth = '2024-08';
  heatmaps = [
    { label: 'Vehicle Attendance', value: 75, colorClass: 'heat-green' },
    { label: 'Safedrop Usage', value: 90, colorClass: 'heat-green' },
    { label: 'Market Vehicle Usage', value: 20, colorClass: 'heat-amber' },
  ];
  happinessLabel = 'Happy';
  happinessColor = 'happy';

  @ViewChild('pieChart', { static: false }) pieChart!: ElementRef<HTMLCanvasElement>;

  chartInstance!: Chart;
sortedTripStatus: any;


  ngOnInit() {
    this.loadMonthlySnapshot();
  }

  getRouteColor(route: any) {
    if (!route.isActive) return 'medium';

    if (route.lyingTimeHours < 24) return 'success'; // green
    if (route.lyingTimeHours >= 24) return 'warning'; // amber
    return 'medium';
  }

  getRouteTooltip(route: any) {
    return `Waybills: ${route.waybillCount}, Packages: ${route.packageCount}, Weight: ${route.totalWeight} Tons`;
  }

  hoverRoute(route: any) {
    this.hoveredRoute = route;
  }

  clearHover() {
    this.hoveredRoute = null;
  }

  openRouteDetails(route: any) {
    // Navigate to route details page or modal with inventory count split by 24h
    console.log('Route details for', route);
  }

  openNotifications() {
    console.log('Opening notifications');
  }

  openToBeCollected() {
    console.log('Opening To Be Collected');
  }

  openPendingPOD() {
    console.log('Opening Pending POD');
  }

  openMarketVehicleUsage() {
    console.log('Opening Market Vehicle Usage');
  }

  loadMonthlySnapshot() {
    // Load pie chart and heat map data based on selectedMonth
    if (!this.pieChart || !this.pieChart.nativeElement) return;
    const ctx = this.pieChart.nativeElement.getContext('2d');
    if (!ctx) return;

    // Destroy old chart instance to avoid duplicates
    if (this.chartInstance) this.chartInstance.destroy();

    const data: ChartData = {
      labels: ['Delivered', 'Undelivered'],
      datasets: [
        {
          data: [370, 20],
          backgroundColor: ['#40c057', '#fa5252'], // green, red
          hoverOffset: 4,
        },
      ],
    };

    const options: ChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    };

    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data,
      options,
    });
  }

    single: any[] | undefined;
  // view: any  = [700, 400];

  // options
  chartData = [
    {
      name: 'DWARKA',
      value: 50 // You can use your actual data here
    },
    {
      name: 'KAROLBAGH',
      value: 60
    },
    {
      name: 'UTTAMNAGAR',
      value: 80
    },
    {
      name: 'MAHIPALPUR',
      value: 40
    },
    {
      name: 'VASANTKUNJ',
      value: 30
    }
  ];
    totalPackages: number = 670;
  labelWithName(data: any): string {
    return data.name;
  }

  // Chart options
  view: [number, number] = [700, 300]; // Chart size
  gradient: boolean = false; 
  showLegend: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Route';
  yAxisLabel: string = 'Packages';


   colorScheme: Color = {
  name: 'customScheme',
  selectable: true,
  group: ScaleType.Ordinal, // ✅ Fix this line
  domain: ['#C62828', '#F9A825', '#43A047', '#81C784', '#66BB6A']
};
}

