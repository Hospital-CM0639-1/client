import { EmergencyVisitStaffService } from './../services/emergency-visit-staff.service';
import { StaffRoleEnums } from "../enums/staff-role.enums";

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