import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule,NG_VALUE_ACCESSOR,FormControlDirective, FormGroupDirective } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material';
import { SourcedefinitionComponent } from './sourcedefinition/sourcedefinition.component';
import { SourceComponent } from './source/source.component'
import { AgGridModule } from 'ag-grid-angular';
import { ExcelService } from './service/JsontoExcel';
import { CommonService } from './service/common.service';
import { POrequirementService } from './service/porequirement.service';
import { POfinancetrackerService } from './service/pofinancetracker.service';
import { P2PtrackerService } from './service/p2ptracker.service';
import { PODeptheadtrackerService } from './service/podeptheadtrack.service';

import { NgxUiLoaderModule } from "ngx-ui-loader";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverallprfComponent } from './overallprf/overallprf.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MenuComponent,
    HeaderComponent,
    BodyComponent,
    AuthLayoutComponent,
    DashboardComponent,
    FooterComponent,
    ControlSidebarComponent,
    PorequirmentComponent,
    PodeptheadtrackerComponent,
    PoapprovaltrackerComponent,
    PofinancetrackerComponent,
    P2ptrackerComponent,
    VendormasterComponent,
    MaterialmasterComponent,
    DepartmentmasterComponent,
    ConsolidationdocuploadComponent,
    ConsolidationprocessComponent,
    ConsolidationreportComponent,
    SourcedefinitionComponent,
    SourceComponent,
    OverallprfComponent,
    UsermasterComponent
  ],
  imports: [
     AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AgGridModule.withComponents([]),
    NgxUiLoaderModule,
    FontAwesomeModule
    // RouterModule.forRoot(routes)
    // RouterModule.forRoot(AppRoutingModule),
  ],
  providers: [ExcelService,NgxUiLoaderService,POrequirementService,PODeptheadtrackerService,P2PtrackerService,POfinancetrackerService,CommonService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
