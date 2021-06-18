import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SigninComponent } from './signin/signin.component';
import { PorequirmentComponent } from './porequirment/porequirment.component';
import { PodeptheadtrackerComponent } from './podeptheadtracker/podeptheadtracker.component';
import { PoapprovaltrackerComponent } from './poapprovaltracker/poapprovaltracker.component';
import { PofinancetrackerComponent } from './pofinancetracker/pofinancetracker.component';
import { P2ptrackerComponent } from './p2ptracker/p2ptracker.component';
import { VendormasterComponent } from './vendormaster/vendormaster.component';
import { MaterialmasterComponent } from './materialmaster/materialmaster.component';
import { DepartmentmasterComponent } from './departmentmaster/departmentmaster.component';
import { ConsolidationdocuploadComponent } from './consolidationdocupload/consolidationdocupload.component';
import { ConsolidationprocessComponent } from './consolidationprocess/consolidationprocess.component';
import { ConsolidationreportComponent } from './consolidationreport/consolidationreport.component';
import { SourcedefinitionComponent } from './sourcedefinition/sourcedefinition.component'
import { SourceComponent } from './source/source.component'
import { OverallprfComponent } from './overallprf/overallprf.component';
import { UsermasterComponent } from './usermaster/usermaster.component';

 const routes: Routes = [
   { path: '', redirectTo: '/Signin', pathMatch: 'full' },
  { path: 'Signin', component: SigninComponent,pathMatch: 'full'
},
  { path: 'Authlayout', component: AuthLayoutComponent, 
  children:[
    {path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
    { path: 'Dashboard', component: DashboardComponent },    
    { path: 'Porequirment', component: PorequirmentComponent },
    { path: 'Podeptheadtracker', component: PodeptheadtrackerComponent },
    { path: 'Poapprovaltracker', component: PoapprovaltrackerComponent },
    { path: 'Pofinancetracker', component: PofinancetrackerComponent },
    { path: 'P2ptracker', component: P2ptrackerComponent },
    { path: 'Vendormaster', component: VendormasterComponent },
    { path: 'Materialmaster', component: MaterialmasterComponent },
    { path: 'Departmentmaster', component: DepartmentmasterComponent },
    { path: 'Consoldocupload', component: ConsolidationdocuploadComponent },
    { path: 'Consolprocess', component: ConsolidationprocessComponent },
    { path: 'Consolreport', component: ConsolidationreportComponent },
    { path: 'Sourcedefinition', component: SourcedefinitionComponent },
    { path: 'Source', component: SourceComponent },
    { path: 'Overallprf', component: OverallprfComponent },
    { path: 'User', component: UsermasterComponent }
  ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
