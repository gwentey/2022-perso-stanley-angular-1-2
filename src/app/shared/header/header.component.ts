import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any;
declare function sbadmin(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  public isCollapsed = true;

  constructor() { }
  chart: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    sbadmin();
  }

}
