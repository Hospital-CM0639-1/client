export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginatedList<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface Column {
  field: string;
  header: string;
}

export interface WardBed {
  id: number;
  bedNumber: string;
  wardSection: string;
  currentStatus: string;
  lastCleanedTimestamp: string;
}

export interface WardBedDetail {
  id: number;
  bedNumber: string;
  wardSection: string;
  currentStatus: string;
  emergencyVisit: {
    id: number;
    patient: {
      id: number;
    }
  }
}

export interface EmergencyVisitStaff {
  staffRole: string;
  visitId: number;
  staffId: number;
  assignedAt: string;
  emergencyVisit: {
    id: number;
    priorityLevel: string;
    patient: {
      id: number;
      firstName: string;
      lastName: string;
    }
    staff: {
      id: number;
      firstName: string;
      lastName: string;
    }
  }
}

export interface PatientNeedingBed {
  visitId: number;
  patientId: number;
  fistName: string;
  lastName: string;
  admissionTimestamp: string;
  priorityLevel: string;
}

export interface Invoice {
  id?: number;
  totalAmount: number;
  paymentStatus: string;
  invoiceTimestamp: string;
  paymentReceivedTimestamp: string | null;
  paymentReceivedAmount: number;
  emergencyVisit: {
    id: number;
    patient?: {
      firstName: string;
      lastName: string;
    };
  };
  createdByStaff: {
    id: number;
  };
}

export interface EmergencyVisit {
  id: number;
  admissionTimestamp: string;
  dischargeTimestamp: string | null;
  patientStatus: string;
  triageNotes: string;
  priorityLevel: string;
  patient: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface Response<T> {
  response: T
}

export interface Patient {
  priorityLevel: string;
  currentStatus: string;
  patientId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string | null;
  emergencyContactName: string;
  emergencyContactNumber: string;
  address: string;
  email: string;
  insuranceProvider: string | null;
  insurancePolicyNumber: string | null;
}
