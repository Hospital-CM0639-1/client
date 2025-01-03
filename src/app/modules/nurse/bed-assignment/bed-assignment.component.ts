import { EmergencyVisitStaff, PatientNeedingBed, WardBed } from './../../../shared/interfaces/interface';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { EWardSection } from '../../../shared/enums/ward-section.enum';
import { EmergencyService } from '../../../shared/services/emergency.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { EStatusBed } from '../../../shared/enums/status-bed.enum';

@Component({
  selector: 'app-bed-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, ButtonModule, CardModule],
  templateUrl: './bed-assignment.component.html',
  styleUrl: './bed-assignment.component.scss'
})
export class BedAssignmentComponent implements OnInit {
  emergencies!: EmergencyVisitStaff[];
  selectPatientId!: number;
  wardsSection: any[] = [];
  selectWardSection!: string;
  beds: WardBed[] = [];  // For bed dropdown
  selectedBed!: number;
  showWardBedSectionDropdown: boolean = false;
  statusBed: any[] = [];
  selectStatusBed!: EStatusBed;
  patientsNeedingBed!: PatientNeedingBed[];

  constructor(
    private emergencyService: EmergencyService, 
    private cd: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.wardsSection = Object.values(EWardSection).map(ward => ({
      label: ward, // This will show 'CARDIAC', 'ORTHOPEDIC', 'GENERAL'
      value: ward  // The actual enum value
    }));
    this.selectStatusBed = EStatusBed.UCCUPIED;
    this.statusBed = [EStatusBed.UCCUPIED];
    this.getPatientsNeedingBed();
    console.log(this.config.data)
    this.selectWardSection = this.config.data?.wardSection;
    this.selectedBed = this.config.data?.id;
    if (this.selectWardSection == null) {
      this.showWardBedSectionDropdown = true;
    }
  }

  onWardChange(event: any) {
    const selectedWard = event.value; // The enum value (e.g., 'CARDIAC')
    this.emergencyService.getWardBedsByStatusAndSection(selectedWard.value, 'AVAILABLE').subscribe({
      next: (response: WardBed[]) => {
        this.beds = response;
        this.cd.detectChanges();
      }
    })
  }

  onSubmit() {
    console.log('Selected Bed:', this.selectedBed);
    console.log('Selected Patient ID:', this.selectPatientId);
    console.log('Selected Status Bed:', this.selectStatusBed);

    this.emergencyService.assignBedToPatient(this.selectedBed, this.selectPatientId, this.selectStatusBed.valueOf()).subscribe({
      next: (response) => {
        console.log('Bed assigned successfully');
        this.ref.close(response);
      },
      error: (err) => {
        console.error('Error assigning bed:', err);
      }
    });
    this.ref.close()
  }

  private getPatientsNeedingBed(): void {
    this.emergencyService.getPatientsNeedingBed().subscribe({
      next: (response) => {
        this.patientsNeedingBed = response;
      },
    })
  }

}
