import { Component, OnInit, VERSION, ViewChild, ElementRef } from "@angular/core";
import {Router} from '@angular/router';
import { P2PtrackerService } from '../service/p2ptracker.service';
import { HttpClient  } from '@angular/common/http';
import{POrequirement,POquotation,POrequirementInfo,POquotationinfo} from '../porequirment/porequirment';
import { CommonService } from '../service/common.service';
declare const $: any;
@Component({
  selector: 'app-p2ptracker',
  templateUrl: './p2ptracker.component.html',
  styleUrls: ['./p2ptracker.component.css']
})
export class P2ptrackerComponent implements OnInit {

  constructor(private router: Router,public CS:CommonService,private objservice:P2PtrackerService,public http:HttpClient) { }
  public userdtl;
  public user;
  public cardTitle="P2P Tracker";
  public objporeq;
  public boolPoreqList=false;
  public porequirementlist;
  public porequirementdetail;
  public porequirmentDetails;
  public editporequirement;
  public editporeq;
  public poreq;
  public porequirmenttab;
  public comment;
  public showSelected;
  public fileupload;
  @ViewChild('fileInput',{  
    static: true  
}) fileInput: ElementRef ;

  ngOnInit() {
    this.userdtl=JSON.parse(localStorage.getItem('useracess'));
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.userdtl);
    console.log("useracess",this.user);
    this.comment="";

    this.getporequirementlist();
    // this.porequirementdetail=this.jsondata.records;
  }


  
  openModal(){
    $("#modal_approval").modal("show");

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



POfileupload(files,i,data){
    console.log("sourceid",files[0]);
    if (!this.validateFile(files[0].name)) {
      alert('Selected file format is not supported');   
      return false;
  }
    const formData = new FormData();
    formData.append("POFile", files[0]);
    formData.append("tenant_id", this.userdtl.tenant_id);
    formData.append("group_id", this.userdtl.group_id);
    formData.append("entity_id", this.userdtl.entity_id);
    formData.append("module_id", this.userdtl.module_id);
    formData.append("user_id", this.user.user_id);
    formData.append("user_name", this.user.user_name);
    formData.append("prf_number", this.objporeq.prf_number);
    // formData.append("vendor_name", data.vendor_name);    
    this.fileupload=formData;   
  }


  approveorder(i){
    if(i==1){
      this.objservice.postFileToServer(this.fileupload)
      .subscribe(
      recieveddata  => {    
          let tempresponsedata = recieveddata;
        console.log("Fileuploadresponse---",tempresponsedata)               
      },
      (error: any) => { this.HandleErrorResponse(error) });   
    }
    let Indata={
      "tenant_id": this.userdtl.tenant_id,
      "entity_id": this.userdtl.entity_id,
      "group_id": this.userdtl.group_id,
      "module_id": this.userdtl.module_id,
      "user_id": this.user.user_id,
      "requirement_id": this.objporeq.requirement_id,  
      "is_p2p_approved": i,     
      "remarks" : this.comment
    }
    console.log("Approvprf",Indata);
    this.objservice.postapprovalPRFFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("porequirementlist---",tempresponsedata)
      // this.sourcedata=tempresponsedata;
      // this.porequirementlist=tempresponsedata;
      // this.porequirementdetail=this.porequirementlist.data;
      
    });
    this.comment='';
   this.fileInput.nativeElement.value='';
    $("#modal_approval").modal("hide");
  }
  
  closemodel(){
    $("#modal_approval").modal("hide");
  }

  list(){
  this.boolPoreqList=false; 

  }

  getporequirementlist(){ 
  
    let Indata={
      "tenant_id": this.userdtl.tenant_id,
      "entity_id": this.userdtl.entity_id,
      "group_id": this.userdtl.group_id,
      "module_id": this.userdtl.module_id,
      "user_id": this.user.user_id,      
    }
    console.log("inputporequirementlist",Indata);
    this.objservice.getp2ptrackerlistFromServer(Indata)
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

  ShowPorequirementdetail(data){

    this.objporeq= new POrequirement();    
    this.objporeq.requirement_id=data.requirement_id;
    this.objporeq.tenant_id=this.userdtl.tenant_id;
    this.objporeq.entity_id=this.userdtl.entity_id;
    this.objporeq.group_id=this.userdtl.group_id;
    this.objporeq.module_id=this.userdtl.module_id;
    this.objporeq.user_id=this.user.user_id;
    


    console.log("EDITinputporequirement",this.objporeq);
    this.objservice.getp2ptrackerbyidFromServer(this.objporeq)
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
    

    // this.objporeq=data;
    // this.porequirmentDetails=this.objporeq.info;
        this.boolPoreqList=true;
      
      });   
    }
    showselected(i){
      this.showSelected=i;
    }

    HandleErrorResponse(err: any)
    {
      //  this.objerrhandler.handleError(String(err));
     console.log("Error",err);
    }

    

}
