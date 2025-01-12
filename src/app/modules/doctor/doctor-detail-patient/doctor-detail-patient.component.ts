import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DoctorService } from '../../../shared/services/doctor.service';

@Component({
  selector: 'app-doctor-detail-patient',
  standalone: true,
  imports: [CardModule],
  templateUrl: './doctor-detail-patient.component.html',
  styleUrl: './doctor-detail-patient.component.scss'
})
export class DoctorDetailPatientComponent implements OnInit {
  constructor(private serviceDoctor: DoctorService) {}

  ngOnInit(): void {
      
  }


}
