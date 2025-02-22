export interface SimpleUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    active: boolean;
    type: string; // admin | staff
    role?: string; // nurse | doctor | secretary
}

export interface User extends SimpleUser {
    staffInfo: null | StaffInfo, // only if type == staff
    patientInfo: null | PatientInfo, // only if type == patient
}

export interface LoggedUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    type: string; // admin | staff
    lastLogin: null | string;
    expiredPassword: boolean; // if true, force user to change password
    token: string; // the JWT Token
    staffInfo: null | StaffInfo;
    patientInfo: null | PatientInfo;
}

export interface StaffInfo {
    id: number;
    role: string;
    department: null | string;
    specialization: null | string;
    hireDate: string;
    phoneNumber: null | string;
}

export interface PatientInfo {
    id: number;
    dateOfBirth: string;
    gender: string; // Male | Female
    contactNumber: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    address: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
}
