export interface MedicalProcedure {
  id: number;
  procedureName: string;
  procedureTimestamp: string;
  description: string;
  procedureCost: number;
  emergencyVisit: MedicalProcedureEmergencyVisit;
  staff: MedicalProcedureStaff;
}

export interface MedicalProcedureEmergencyVisit{
  id: number;
  }


export interface MedicalProcedureStaff {
  id: number;
  firstName: string;
  lastName: string;
  }


export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
}

export interface EmergencyVisit {
  id: number;
  triageNotes: string;
  priorityLevel: string;
  patient: Patient;
}

export interface StaffAssignment {
  staffRole: string;
  visitId: number;
  staffId: number;
  assignedAt: string;
  emergencyVisit: EmergencyVisit;
}

export interface TransformedData {
  PatientId: number;
  Name: string;
  Priority: string;
  TriageNotes: string;
}
