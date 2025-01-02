import { PatientRoutingModule } from './modules/patient/patient-routing.module';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'access',
    loadChildren: () =>
      import('./modules/access/access-routing.module').then(
        (m) => m.AccessRoutingModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
        import('./modules/admin/admin-routing.module').then(
            (m) => m.AdminRoutingModule
        ),
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./modules/doctor/doctor-routing.module').then(
        (m) => m.DoctorRoutingModule
      ),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./modules/patient/patient-routing.module').then(
        (m) => m.PatientRoutingModule
      ),
  },
  {
    path: 'nurse',
    loadChildren: () =>
      import('./modules/nurse/nurse-routing.module').then(
        (m) => m.NurseRoutingModule
      ),
  },
  {
    path: 'secretary',
    loadChildren: () =>
      import('./modules/secretary/secretary-routing.module').then(
        (m) => m.SecretaryRoutingModule
      ),
  },
  { path: '**', redirectTo: 'access/login' }, // Fallback route
];
