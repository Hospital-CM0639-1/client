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
  }

