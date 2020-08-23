import { Component, OnInit } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './../product/product.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
  }

  navigateTo(targetPath: string): void {
    this.router.navigate([targetPath]);
  }

}
