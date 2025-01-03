import { Component, Input, OnInit } from '@angular/core';
import { Button } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    Button,
    DropdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  @Input() userId: null | string = null;

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
    });
  }
}
