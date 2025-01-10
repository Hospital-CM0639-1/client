import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner-loader',
  standalone: true,
  imports: [ProgressSpinnerModule, CommonModule],
  templateUrl: './spinner-loader.component.html',
  styleUrl: './spinner-loader.component.scss'
})
export class SpinnerLoaderComponent {
  @Input() visible: boolean = false;
}
