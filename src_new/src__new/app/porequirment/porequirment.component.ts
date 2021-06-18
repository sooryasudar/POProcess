import { Component, OnInit, VERSION, ViewChild, ElementRef } from "@angular/core";
import {Router} from '@angular/router';
import { POrequirementService } from '../service/porequirement.service';
import { CommonService } from '../service/common.service';

import { HttpClient  } from '@angular/common/http';
import{POrequirement,POquotation,POrequirementInfo,POquotationinfo} from './porequirment';
declare const $: any;
@Component({
  selector: 'app-porequirment',
  templateUrl: './porequirment.component.html',
  styleUrls: ['./porequirment.component.css']
})
export class PorequirmentComponent implements OnInit {

  constructor(private router: Router,private objservice:POrequirementService,public http:HttpClient,public CS:CommonService) { }

  public userdtl;
  public user;
  public prfload;
  public locationlist;
  public vendorlist;
  public objporeq:POrequirement;
  public objporeqquotation:POquotation;
  public boolPoreqList=false;
  public porequirementlist;
  public editporequirement;
  public editporeq;
  public poreq;

  public porequirementdetail;
   public editBtnshow:boolean;
  public cardTitle="Create New";
  
  public showModal:boolean;
  
  public porequirmentDetails:Array<POrequirementInfo> = [] ;
  public newporequirment: any = {};
  public porequirmentquotationDetails: Array<POquotation> = [];
  public newpoquotation:POquotationinfo;
  public porequirmenttab: Array<POquotation> = [];
  public newporequirmenttab;
  public poqutation_;
  public fileupload=[];
  public vendordocupload=[];

  @ViewChild('fileInput',{  
    static: true  
}) fileInput: ElementRef ;


  ngOnInit() {
    this.userdtl=JSON.parse(localStorage.getItem('useracess'));
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.userdtl);

    console.log("useracess",this.user);
    this.objporeq= new POrequirement();
    this.objporeqquotation= new POquotation();
  this.newpoquotation= new POquotationinfo();
  this.getporequirementload();

    // this.porequirmenttab=[];
    // this.porequirmenttab.poquotation=[];
    this.getporequirementlist();
    this.editBtnshow = false;
    this.showModal=false;
  this.boolPoreqList=true;  
  }


  cancelEdit() {
    this.boolPoreqList = true;
    this.editBtnshow = false;
    this.cardTitle = "List";
  }
  list() {
    this.cardTitle = "List";
    this.getporequirementlist();
    this.boolPoreqList = true;
    // this.startScript();
  }
  backlist() {
    this.cardTitle = "Create New";
    this.objporeq= new POrequirement();
    this.objporeqquotation= new POquotation();
    this.newpoquotation= new POquotationinfo();
    this.porequirmenttab=[];
    this.getporequirementload();
    this.boolPoreqList = false;
    // this.clear();
  }
  onlyDecimalNumberKey(event) {
    // console.log(event)
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }


  addFieldValue(data?) {
    //console.log(this.newOtherCost)
    this.porequirmentDetails.push(this.newporequirment);
    let getLength = this.porequirmentDetails.length - 1;    
    this.newporequirment = {};    
    // this.boolDisableOtherCostBtn = false; 
  }

  deleteFieldValue(index) {
    this.porequirmentDetails.splice(index, 1);
    // this.costVendorTypeArray.splice(index, 1);    
  }			
  clearporequirementFields() {
    this.newporequirment = {};
    // this.boolDisableOtherCostBtn = true;
  }

  addQutation() {
  
let length=this.porequirmenttab.length + 1;
this.newporequirmenttab={"pobudget_id":length,"vendor_type" : "",
"vendor_name" : "",
"vendor_code" : "",
"vendor_location" : "",
"vendor_address" : "",
"gst_number" : "",
"vendor_emailid" : "",
"vendor_total_line_value" : 0,
"VendorFile_name":"",
"quotationfile_name" : "",
"quotation":[],
};
// this.porequirmenttab.poqu"otation
this.porequirmenttab.push(this.newporequirmenttab);  
  }


  deleteQutation(index) {
    this.porequirmenttab.splice(index, 1);
    // this.costVendorTypeArray.splice(index, 1);    
  }			
  addquotationValue(data) {
    //console.log(this.newOtherCost)
    // let Length = this.porequirmenttab.quotation.length + 1;    

    
          data.push(this.newpoquotation);
    // this.porequirmentquotationDetails.push(this.newpoquotation);
    // let getLength = this.porequirmentDetails.length - 1;    
   this.newpoquotation= new POquotationinfo();
  }

  deletequotationFieldValue(index) {
    this.porequirmentquotationDetails.splice(index, 1);
    // this.costVendorTypeArray.splice(index, 1);    
  }			
  clearquotationFields() {
    this.newpoquotation= new POquotationinfo();

    // this.boolDisableOtherCostBtn = true;
  }

  openComparisonModal(){
    $("#quotation_Modal").modal("show");
  }

  closemodal(){
    $("#quotation_Modal").modal("hide");
  }

  getporequirementload(){

    let Indata={
      "user_id": this.user.user_id,
      "user_name": this.user.user_name,
      "department": this.user.department
   
    }
    console.log(Indata);

    this.objservice.getporequirementloadFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("POrequirementloadresponse---",tempresponsedata)
    this.prfload=tempresponsedata;
      // this.sourcedata=tempresponsedata;
      // this.porequirementdetail=tempresponsedata;
      this.objporeq.reporting_manager=this.prfload.reporting_manager;
      this.objporeq.prf_number=this.prfload.prf_number;
      this.objporeq.budget_allocated=this.prfload.allocated_budget;
      this.objporeq.prf_number=this.prfload.prf_number;
      this.locationlist=this.prfload.location_list.data;
      this.vendorlist=this.prfload.vendor_list.data;


    });

  }
  locationchange(param){

    this.locationlist.forEach((item, index) => {
      // console.log(item); // 1, 2, 3
     if(item.location==param){
    this.objporeq.delivery_address=item.delivery_address;
     }
    });
  }

  vendorchange(param,i){

    this.vendorlist.forEach((item, index) => {
      // console.log(item); // 1, 2, 3
     if(item.vendor_name==param){
    this.porequirmenttab[i].vendor_code=item.vendor_code;
    this.porequirmenttab[i].gst_number=item.gst_number;
    this.porequirmenttab[i].vendor_address=item.address;
    this.porequirmenttab[i].vendor_emailid=item.email_id;
    this.porequirmenttab[i].vendor_location=item.Location;
     }
    });

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
    this.objservice.getporequirementFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("porequirementlist---",tempresponsedata)
      // this.sourcedata=tempresponsedata;
      this.porequirementlist=tempresponsedata;
      this.porequirementdetail=this.porequirementlist.data;
      setTimeout(() => {
        this.loadData();
           }, 300);
    });

  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'pdf' ) {
        return true;
    }
    else {
        return false;
    }
}




quotationfileupload(files,i,data){
    console.log("sourceid",files[0]);
    if (!this.validateFile(files[0].name)) {
      alert('Selected file format is not supported');   
      return false;
  }
    const formData = new FormData();
    formData.append("QuotationFile", files[0]);
    formData.append("tenant_id", this.userdtl.tenant_id);
    formData.append("group_id", this.userdtl.group_id);
    formData.append("entity_id", this.userdtl.entity_id);
    formData.append("module_id", this.userdtl.module_id);
    formData.append("user_id", this.user.user_id);
    formData.append("user_name", this.user.user_name);
    formData.append("prf_number", this.objporeq.prf_number);
    formData.append("vendor_name", data.vendor_name);


    
    this.fileupload[i]=formData;   
  }

  SavePRFform(){
    this.fileupload.forEach((item, index) => {
        
    this.objservice.postFileToServer(item)
    .subscribe(
    recieveddata  => {    
        let tempresponsedata = recieveddata;
      console.log("Fileuploadresponse---",tempresponsedata)
     
      // this.fileupload=tempresponsedata;
      // this.fileInput.nativeElement.value='';
      // this.getconsolidationdata();
      // this.ngxService.stop();
  
    },
    (error: any) => { this.HandleErrorResponse(error) });
  });;


    this.objporeq.porequirementinfo=this.porequirmentDetails;
    this.objporeq.tenant_id=this.userdtl.tenant_id;
    this.objporeq.entity_id=this.userdtl.entity_id;
    this.objporeq.group_id=this.userdtl.group_id;
    this.objporeq.module_id=this.userdtl.module_id;
    this.objporeq.user_id=this.user.user_id;
    this.objporeq.user_name=this.user.user_name;

//  this.objporeqquotation=this.porequirmenttab;
this.objporeq.poquotation=this.porequirmenttab;
console.log("requirement_id",this.objporeq.requirement_id);

if(this.objporeq.requirement_id==0){
  console.log("inputporequirementlist",this.objporeq);
  this.objservice.postporequirementFromServer(this.objporeq)
  .subscribe(
  recieveddata  => {
    let tempresponsedata = recieveddata;
    console.log("prfsaveresponse---",tempresponsedata)
  // this.objporeq= new POrequirement();
    // this.sourcedata=tempresponsedata;
    // this.porequirementdetail=tempresponsedata;
  });
}
else{
  console.log("updateinputporequirementlist",this.objporeq);
    this.objservice.postupdateporequirementFromServer(this.objporeq)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("prfupdatesaveresponse---",tempresponsedata)
    // this.objporeq= new POrequirement();
      // this.sourcedata=tempresponsedata;
      // this.porequirementdetail=tempresponsedata;
    });

}
this.objporeq= new POrequirement();
this.objporeqquotation= new POquotation();
this.newpoquotation= new POquotationinfo();
this.porequirmenttab=[];

// this.fileInput.nativeElement.value='';

  }

  EditPorequirementdetail(data){

    this.objporeq= new POrequirement();   
    this.objporeq.requirement_id=data.requirement_id;
    this.objporeq.tenant_id=this.userdtl.tenant_id;
    this.objporeq.entity_id=this.userdtl.entity_id;
    this.objporeq.group_id=this.userdtl.group_id;
    this.objporeq.module_id=this.userdtl.module_id;
    this.objporeq.user_id=this.user.user_id;
    this.objporeq.user_name=this.user.user_name;


    console.log("EDITinputporequirement",this.objporeq);
    this.objservice.getporequirementbyidFromServer(this.objporeq)
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

  this.boolPoreqList=false;  

      // this.sourcedata=tempresponsedata;
      // this.porequirementdetail=tempresponsedata;
    });

  }
  vendorvalidateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'pdf' ) {
        return true;
    }
    else {
        return false;
    }
  }
  vendorfileupload(files,i,data){
    console.log("vendordoc",files);
    if (!this.vendorvalidateFile(files[0].name)) {
      alert('Selected file format is not supported');   
      return false;
  }
    const formData = new FormData();
    formData.append("QuotationFile", files[0]);
    formData.append("tenant_id", this.userdtl.tenant_id);
    formData.append("group_id", this.userdtl.group_id);
    formData.append("entity_id", this.userdtl.entity_id);
    formData.append("module_id", this.userdtl.module_id);
    formData.append("user_id", this.user.user_id);
    formData.append("user_name", this.user.user_name);
    formData.append("prf_number", this.objporeq.prf_number);
    // formData.append("vendor_name", this.objporeq.finalized_vendor);


    
    this.vendordocupload[i]=formData;   
  }

  ProcessPRFform(){
    this.fileupload.forEach((item, index) => {
            // console.log(item); // 1, 2, 3
    this.objservice.postFileToServer(item)
    .subscribe(
    recieveddata  => {    
        let tempresponsedata = recieveddata;
      console.log("Fileuploadresponse---",tempresponsedata)
     
      // this.fileupload=tempresponsedata;
      // this.fileInput.nativeElement.value='';
      // this.getconsolidationdata();
      // this.ngxService.stop();
  
    },
    (error: any) => { this.HandleErrorResponse(error) });
  });;


    this.objporeq.porequirementinfo=this.porequirmentDetails;

//  this.objporeqquotation=this.porequirmenttab;
this.objporeq.poquotation=this.porequirmenttab;
// console.log("requirement_id",this.objporeq.requirement_id);

if(this.objporeq.requirement_id==0){
  console.log("inputapprovalPRF",this.objporeq);
  this.objservice.postporequirementFromServer(this.objporeq)
  .subscribe(
  recieveddata  => {
    let tempresponsedata = recieveddata;
    console.log("prfparrovalsaveresponse---",tempresponsedata)
  // this.objporeq= new POrequirement();
    // this.sourcedata=tempresponsedata;
    // this.porequirementdetail=tempresponsedata;
  });
}
else{
  this.objporeq.is_processed=1;
  if(this.vendordocupload!=[]){
    this.vendordocupload.forEach((item, index) => {
      // console.log(item); // 1, 2, 3
  this.objservice.postvendorFileToServer(item)
  .subscribe(
  recieveddata  => {    
  let tempresponsedata = recieveddata;
  console.log("Fileuploadresponse---",tempresponsedata)
  
  // this.fileupload=tempresponsedata;
  // this.fileInput.nativeElement.value='';
  // this.getconsolidationdata();
  // this.ngxService.stop();
  
  },
  (error: any) => { this.HandleErrorResponse(error) });
  });;
  }
  else{
  // console.log("updatetodeptheadprf",this.objporeq);

  }
 

  console.log("updatetodeptheadprf",this.objporeq);
    this.objservice.postupdateporequirementFromServer(this.objporeq)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("prfapprovalupdaterespsone---",tempresponsedata)
    // this.objporeq= new POrequirement();
      // this.sourcedata=tempresponsedata;
      // this.porequirementdetail=tempresponsedata;
    });

}
this.objporeq= new POrequirement();
this.objporeqquotation= new POquotation();
this.newpoquotation= new POquotationinfo();
this.porequirmenttab=[];
  
  }

  totalquotation(){

    this.newporequirment.total_value=this.newporequirment.quantity*this.newporequirment.unit_value;
  }

  totalvendorquotation(){
    this.newpoquotation.vendor_total_value=this.newpoquotation.vendor_quantity*this.newpoquotation.vendor_unit_value;
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


  HandleErrorResponse(err: any)
  {
    //  this.objerrhandler.handleError(String(err));
   console.log("Error",err);
  }


}
