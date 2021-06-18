import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PODeptheadtrackerService } from '../service/podeptheadtrack.service';
import { HttpClient  } from '@angular/common/http';
import{POrequirement,POquotation,POrequirementInfo,POquotationinfo} from '../porequirment/porequirment';
import { CommonService } from '../service/common.service';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService

declare const $: any;
@Component({
  selector: 'app-podeptheadtracker',
  templateUrl: './podeptheadtracker.component.html',
  styleUrls: ['./podeptheadtracker.component.css']
})
export class PodeptheadtrackerComponent implements OnInit {

  constructor(private router: Router,public CS:CommonService,private objservice:PODeptheadtrackerService,public http:HttpClient,private ngxService: NgxUiLoaderService) { }
  public userdtl;
  public user;
  public cardTitle="Department Head Tracker";
  public objporeq;
  public boolPoreqList=false;
  public porequirementlist;
  public porequirementdetail;
  public porequirmentDetails;
  public porequirementapproveddetail;
  public editporequirement;
  public editporeq;
  public poreq;
  public porequirmenttab;
  public comment;
  public showSelected;
  public alertmsg;
  public Tabval;
  public listval;
  

  ngOnInit() {
    this.userdtl=JSON.parse(localStorage.getItem('useracess'));
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.userdtl);
    console.log("useracess",this.user);
    this.comment="";
    this.listval="Unapprove";
    this.objporeq= new POrequirement();

    this.getporequirementlist();
    // this.porequirementdetail=this.jsondata.records;
  }


  
  openModal(){
    $("#modal_approval").modal("show");

  }

  approveorder(i){
    this.ngxService.start(); 

    let Indata={
      "tenant_id": this.userdtl.tenant_id,
      "entity_id": this.userdtl.entity_id,
      "group_id": this.userdtl.group_id,
      "module_id": this.userdtl.module_id,
      "user_id": this.user.user_id,
      "requirement_id": this.objporeq.requirement_id,  
      "is_dept_head_approved": i,     
      "finalized_vendor":this.objporeq.finalized_vendor,
      "remarks" : this.comment
    }
    console.log("Approvprf",Indata);
    this.objservice.postapprovalPRFFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      this.alertmsg=tempresponsedata;
      console.log("porequirementlist---",this.alertmsg)
      if(this.alertmsg.Status=="Success"){
        this.ngxService.stop(); 
      
            if(i==1){
              alert("PRF no:"+this.objporeq.prf_number+"Approved Sucessfully");
              this.list();
            }
           else if(i==2){
              alert("PRF no:"+this.objporeq.prf_number+"Holded Sucessfully");
              this.list();
            }
            else if(i==3){
              alert("PRF no:"+this.objporeq.prf_number+"Rejected Sucessfully");
              this.list();
            }
          }
          this.comment='';
    });
  
     
    
    // $("#modal_approval").modal("hide");
  }
  
  closemodel(){
    $("#modal_approval").modal("hide");
  }

  list(){
  this.boolPoreqList=false; 
  this.getporequirementlist();

  }

  getporequirementlist(){ 
  
    let Indata={
      "tenant_id": this.userdtl.tenant_id,
      "entity_id": this.userdtl.entity_id,
      "group_id": this.userdtl.group_id,
      "module_id": this.userdtl.module_id,
      "user_id": this.user.user_id,
      "department": this.user.department,   
    }
    console.log("inputporequirementlist",Indata);
    this.objservice.getpodeptheadlistFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("porequirementlist---",tempresponsedata)
      // this.sourcedata=tempresponsedata;
      this.porequirementlist=tempresponsedata;
      this.porequirementdetail=this.porequirementlist.data;
      this.porequirementapproveddetail=this.porequirementlist.approved_list;

      setTimeout(() => {
        this.loadData1();
           }, 500);
    });

  }

  private loadData() {

    if ($.fn.dataTable.isDataTable('#tableExport')) {
      $('#tableExport').DataTable();
    }
    else {
      $('#tableExport').DataTable({
        // dom: 'Bfrtip',
        // buttons: ['pdf'],
        buttons: [],
        "pageLength": 25,
        // "paging": true,
        // "scrollX": true,
        // "scrollY":"70vh",
        "bFilter": true,
        "bInfo": true,
        "order": [], //to disable inital sort
        drawCallback: () => {
        
         }
      });
    }
  }

  private loadData1() {

    if ($.fn.dataTable.isDataTable('#tableExportApprove')) {
      $('#tableExportApprove').DataTable();
    }
    else {
      $('#tableExportApprove').DataTable({
        // dom: 'Bfrtip',
        // buttons: ['pdf'],
        buttons: [],
        "pageLength": 25,
        // "paging": true,
        // "scrollX": true,
        // "scrollY":"70vh",
        "bFilter": true,
        "bInfo": true,
        "order": [], //to disable inital sort
        drawCallback: () => {
        
         }
      });
    }
  }

  ShowPorequirementdetail(data){


    this.objporeq= new POrequirement();

    
    this.objporeq.requirement_id=data.requirement_id;
    this.objporeq.tenant_id=this.userdtl.tenant_id;
    this.objporeq.entity_id=this.userdtl.entity_id;
    this.objporeq.group_id=this.userdtl.group_id;
    this.objporeq.module_id=this.userdtl.module_id;
    this.objporeq.user_id=this.user.user_id;
    


    console.log("EDITinputporequirement",this.objporeq);
    this.objservice.getpodeptheadbyidFromServer(this.objporeq)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("prfeditresponse---",tempresponsedata)
      this.editporequirement=tempresponsedata;
      this.editporeq=this.editporequirement.po_requirement;

this.poreq=this.editporeq.prf_list;
this.porequirmentDetails=this.editporeq.requirement_info;
this.porequirmenttab=this.editporeq.poquotation;

console.log("prfreqinfo---",this.porequirmentDetails)
console.log("poquotation---",this.porequirmenttab)

this.objporeq.requirement_id=this.poreq[0].requirement_id;
this.objporeq.requirement_date=this.poreq[0].requirement_date;
this.objporeq.reporting_manager=this.poreq[0].reporting_manager;
this.objporeq.purpose=this.poreq[0].purpose;
this.objporeq.purchase_type=this.poreq[0].purchase_type;
this.objporeq.purchase_catagory=this.poreq[0].purchase_catagory;
this.objporeq.prf_number=this.poreq[0].prf_number;
this.objporeq.perceived_benefits=this.poreq[0].perceived_benefits;
this.objporeq.location=this.poreq[0].location;
this.objporeq.is_budgeted=this.poreq[0].is_budgeted;
this.objporeq.finalized_vendor=this.poreq[0].finalized_vendor;
this.objporeq.department=this.poreq[0].department;
this.objporeq.date_of_delivery_expected=this.poreq[0].date_of_delivery_expected;
this.objporeq.budget_allocated=this.poreq[0].budget_allocated;
this.objporeq.delivery_address=this.poreq[0].delivery_address;
this.objporeq.payment_term=this.poreq[0].payment_term;
this.objporeq.total_line_value=this.poreq[0].total_line_value;
this.objporeq.vendor_selection_reason=this.poreq[0].vendor_selection_reason;
this.objporeq.approver_mailid=this.poreq[0].approver_mailid;
this.objporeq.approver_name=this.poreq[0].approver_name;
this.objporeq.approver_department=this.poreq[0].approver_department;
this.objporeq.VendorFile_name=this.poreq[0].VendorFile_name;
this.objporeq.is_processed=this.poreq[0].is_processed;
this.objporeq.po_file_name=this.poreq[0].po_file_name;
    
        this.boolPoreqList=true;
      
      });   
    }
    tabclick(param){
      this.Tabval="";
  this.Tabval=param;
  console.log(this.Tabval);
    }

    approvevelist(param){
      this.ngxService.start(); 
      this.listval="";
      this.listval=param;
      console.log(this.listval);
      setTimeout(() => {
        this.loadData1();
  this.ngxService.stop(); 
           }, 1500);
    }

    openComparisonModal(){
      $("#quotation_Modal").modal("show");
    }
  
    closemodal(){
      $("#quotation_Modal").modal("hide");
    }

}
