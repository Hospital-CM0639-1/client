import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-staff-user-list',
  standalone: true,
  imports: [],
  templateUrl: './staff-user-list.component.html',
  styleUrl: './staff-user-list.component.scss'
})
export class StaffUserListComponent implements OnInit, OnDestroy {

  protected role: null|string = null;

  constructor(
      private route: ActivatedRoute,
      private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role');

    });
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  onClick() {
    console.log(this.role);
  }
}
