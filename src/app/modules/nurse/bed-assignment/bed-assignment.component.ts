import { EmergencyVisitStaff } from './../../../shared/interfaces/interface';
import { EmergencyVisitStaffService } from './../../../shared/services/emergency-visit-staff.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-bed-assignment',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './bed-assignment.component.html',
  styleUrl: './bed-assignment.component.scss'
})
export class BedAssignmentComponent implements OnInit {
  emergencies: any;
  selectPatient!: string;

  public constructor(private emergencyVisitStaffService: EmergencyVisitStaffService) {}

  ngOnInit(): void {
    this.getEmergencyVisitStaff();
      
  }

  private getEmergencyVisitStaff(page: number = 0, rows: number = 5, sort: string = 'assignedAt,DESC', patientCurrentStatus: string = 'IN_TREATMENT'): void {
    this.emergencyVisitStaffService.getEmergencyVisitStaff(page, rows, sort, patientCurrentStatus).subscribe({
      next: (response) => {
          this.emergencies = Array.from(
            new Set(
              response.content.map(item => item.emergencyVisit.patient.id)
            )
          );
      },
    })
  }

}
