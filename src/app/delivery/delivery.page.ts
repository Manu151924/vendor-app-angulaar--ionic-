import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {  IonContent,  IonIcon,  IonCardContent, IonChip,IonSelect,IonSelectOption ,IonGrid, IonRow, IonCol, IonCard, IonCardHeader,IonText, IonList, IonItem, IonLabel, IonCardTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from '../data';


import { FormsModule } from '@angular/forms';
import { checkmarkDone, home, personOutline, notifications,location, carSport, } from 'ionicons/icons';
import { Chart } from 'chart.js';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  standalone: true,
  imports: [IonCardTitle,  IonCardHeader,NgxChartsModule, IonCard, IonCol, IonRow, IonGrid, IonChip, IonCardContent,IonSelect,IonSelectOption , IonIcon,IonText, IonContent, IonItem, IonLabel, CommonModule,FormsModule],
})
export class DeliveryPage implements OnInit {
constructor() {
    addIcons({ checkmarkDone, home, personOutline, notifications, location,carSport });
  Object.assign(this, { single });
     this.progressValue = 0;
         this.updatePieChart();

  }

   deliveredWB = 370;
  undeliveredWB = 20;
  notificationsCount = 5;
  selectedBranch = 'DELHI-11';
  
progressValue: number = 0; 
isDragging: boolean = false;

getHappinessFace(): string {
  const percent = this.progressValue * 100;

  if (percent <= 40) return '😠'; // Angry
  else if (percent <= 70) return '🙂'; // Happy
  else return '😃'; // Great
}

updateProgressFromX(x: number) {
  const wrapper = document.querySelector('.progress-wrapper') as HTMLElement;
  if (!wrapper) return;

  const rect = wrapper.getBoundingClientRect();
  let percent = (x - rect.left) / rect.width;

  // clamp 0–1
  percent = Math.min(1, Math.max(0, percent));
  this.progressValue = percent;

  console.log(`Progress: ${Math.round(this.progressValue * 100)}%`);
  console.log(`Emoji: ${this.getHappinessFace()}`);
}

startDrag(event: MouseEvent) {
  this.isDragging = true;
  this.updateProgressFromX(event.clientX);
}

onDrag(event: MouseEvent) {
  if (this.isDragging) {
    this.updateProgressFromX(event.clientX);
  }
}

endDrag() {
  this.isDragging = false;
}
vehicleAttendancePercent = 33;  
  safeDropPercent = 66;          
  marketVehiclePercent = 80;      

  getGradient(percentage: number): string {
    let redWidth = 0;
    let orangeWidth = 0;
    let greenWidth = 0;

    if (percentage <= 33) {
      redWidth = percentage;  
    } else if (percentage <= 66) {
      redWidth = 33;         
      orangeWidth = percentage - 33;  
    } else {
      redWidth = 33;          
      orangeWidth = 33;       
      greenWidth = percentage - 66; 
    }

    return `linear-gradient(to right, red ${redWidth}%, orange ${orangeWidth + redWidth}%, green ${greenWidth + orangeWidth + redWidth}%)`;
  }


  // Function to get the color for the percentage number on the right side
  getBarColor(percentage: number): string {
    if (percentage <= 33) {
      return 'red';
    } else if (percentage <= 66) {
      return 'orange';
    } else {
      return 'green';
    }
  }

tripStatusList = [
    { vehicleNo: '1234', ofdCount: 16, totalWaybills: 20, lastUpdated: '12:00', special: false },
    { vehicleNo: '4321', ofdCount: 11, totalWaybills: 17, lastUpdated: '14:00', special: false },
    { vehicleNo: '7733', ofdCount: 12, totalWaybills: 22, lastUpdated: '10:00', special: true },
    { vehicleNo: '8973', ofdCount: 10, totalWaybills: 23, lastUpdated: '09:00', special: false },
    { vehicleNo: '1287', ofdCount: 0,  totalWaybills: 24, lastUpdated: '05:00', special: false },
  ];

  absentVehiclesList = [
    { vehicleNo: '1654', lastTripDate: '18-Aug-2024' },
    { vehicleNo: '1218', lastTripDate: '17-Aug-2024' }
  ];

  // Returns true if the row should be amber (manifested != unloaded)
  isAmber(trip: any): boolean {
    return trip.ofdCount !== trip.totalWaybills && trip.ofdCount !== 0;
  }
  
  // Returns true if the row should be red (nothing unloaded)
  isRowDanger(trip: any): boolean {
    return trip.ofdCount === 0;
  }

  // Returns true if only waybill count is in amber
  isWaybillDiff(trip: any): boolean {
    return trip.ofdCount !== trip.totalWaybills && trip.ofdCount !== 0;
  }

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
  ];

  totalWaybills = this.routes.reduce((sum, b) => sum + b.waybillCount, 0);
  totalWeight = Number(this.routes.reduce((sum, b) => sum + b.totalWeight, 0).toFixed(1));
  totalTon = Math.ceil(this.totalWeight / 1000);

sortedTripStatus = [
    { vehicleNo: '1234', ofdCount: 16, totalWaybills: 20, lastUpdate: new Date() },
    { vehicleNo: '5678', ofdCount: 12, totalWaybills: 20, lastUpdate: new Date() },
    // Add more trips
  ];

  absentVehicles = [
    { vehicleNo: '9876', lastTripDate: new Date('2025-09-20') },
    { vehicleNo: '5432', lastTripDate: new Date('2025-09-21') },
    // Add more absent vehicles
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


  ngOnInit() {
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
    return data.dataname;
  }

  // Chart options
  view: [number, number] = [300, 230];
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
    group: ScaleType.Ordinal, 
    domain: ['#C62828', '#F9A825', '#43A047', '#81C784', '#66BB6A']
  };

pieChartData: any[] = [];
  
  // Pie chart color scheme
    totalDelivered = 370;
  totalUndelivered = 20;
  colorSchemeForPie: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal, 
    domain: ['#40c057', '#fa5252']  // Green for Delivered, Red for Undelivered
  };

  // Define chart size
  viewForPie: [number, number] = [150, 200];
   updatePieChart() {
    const total = this.totalDelivered + this.totalUndelivered;
    
    this.pieChartData = [
      {
        name: 'Delivered',
        value: this.totalDelivered,
      },
      {
        name: 'Undelivered',
        value: this.totalUndelivered,
      }
    ];
  }

}
