import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToggleButtonModule } from "primeng/togglebutton";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [
    ToggleButtonModule,
    FormsModule
  ],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent {

  @Input({required: true}) active: boolean = true;
  @Input({required: true}) activeLabel: string = 'Active';
  @Input({required: true}) notActiveLabel: string = 'Not active';
  @Output() onChangeEvent = new EventEmitter<boolean>();

  onChange() {
    this.onChangeEvent.emit(this.active);
  }
}
