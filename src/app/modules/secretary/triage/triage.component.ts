import {Component, OnInit} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ReceptionService, triageEdit} from "../../../shared/services/reception.service";

@Component({
  selector: 'app-triage',
  standalone: true,
  imports: [
    DropdownModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    Button,
    InputTextModule
  ],
  templateUrl: './triage.component.html',
  styleUrl: './triage.component.scss'
})
export class TriageComponent implements OnInit {
  triageNotes: string | undefined;
  status: string | undefined;
  priority: string | undefined;
  patientId: number = 0;
  patientName: string | undefined;

  priorityOptions = [
    {label: 'RED', value: 'RED'},
    {label: 'ORANGE', value: 'ORANGE'},
    {label: 'GREEN', value: 'GREEN'}
  ];

  statusOptions = [
    {label: 'IN_TREATMENT', value: 'IN_TREATMENT'},
    {label: 'DISCHARGED', value: 'DISCHARGED'},
    {label: 'WAITING', value: 'WAITING'},
    {label: 'ADMITTED', value: 'ADMITTED'}
  ];

  constructor(
    public config: DynamicDialogConfig,
    private receptionService: ReceptionService,
    private ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    const data = this.config.data.patient;
    if (data) {
      this.patientId = data.patientId;
      this.patientName = data.firstName + ' ' + data.lastName;
      this.status = data.currentStatus;
      this.priority = data.priorityLevel;
      this.triageNotes = data.triageNotes
    }
  }

  onSubmit() {
    this.receptionService.updateTriage(this.buildTriage()).subscribe({
      next: (response) => {
        console.log('Patient edited successfully', response);
        this.ref.close(true);
      },
      error: (err) => {
        console.error('Error updating patient:', err);
      }
    });
  }

  private buildTriage(): triageEdit {
    return {
      triageNotes: this.triageNotes,
      priorityLevel: this.priority,
      status: this.status,
      patientId: this.patientId
    }
  }

}
