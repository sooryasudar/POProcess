import { Component, OnInit,EventEmitter,ViewChild, Output } from '@angular/core';
import {Router} from '@angular/router';
import { ConsolidationreportService } from '../service/consolidationreport.service';
import { HttpClient  } from '@angular/common/http';
import { GridOptionsWrapper, GridOptions, Grid } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ExcelService } from '../service/JsontoExcel';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService

// import { AllCommunityModules } from 'ag-grid-community/all-modules';
// import { ExcelExportModule, exportMultipleSheetsAsExcel } from '@ag-grid-enterprise/excel-export';
declare const $: any;

@Component({
  selector: 'app-consolidationreport',
  templateUrl: './consolidationreport.component.html',
  styleUrls: ['./consolidationreport.component.css']
})
export class ConsolidationreportComponent implements OnInit {
  // @ViewChild('agGrid') agGrid: AgGridAngular;
  public objconsol;
  public userdtl;
  public user;
  public search;
  public searchlist;
  public consolreport;
  public tax_invoice;
  public pure_agent;
  public commercial_cn_dn;
  public bill_of_supply;
  public debit_note;
  public credit_note;
  public Tabval;
  public pagination;
  public paginationPageSize;
  public loader;

  constructor(private router: Router,private objservice:ConsolidationreportService,
    private excelService: ExcelService,private ngxService: NgxUiLoaderService,public http:HttpClient) { }

  ngOnInit() {
    this.userdtl=JSON.parse(localStorage.getItem('useracess'));
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.user);
    this.objconsol={"from_date":Date,"to_date":Date}
    this.consolreport=false;
    this.Tabval="";
    // enables pagination in the grid
this.pagination = true;

// sets 10 rows per page (default is 100)
this.paginationPageSize = 10;
    
  }


  searchconsoldationfile(){
// this.loader=true;
this.ngxService.start(); 
    let data = {
      "from_date": this.objconsol.from_date,

      "to_date": this.objconsol.to_date,


      "tenant_id": this.userdtl.tenant_id,
      "group_id": this.userdtl.group_id,

      "entity_id": this.userdtl.entity_id,
      "module_id": this.userdtl.module_id,



      
     
    }
  
console.log("inputsource",data);
    this.objservice.getSearchlistFromServer(data)
    .subscribe(
    recieveddata  => { 
   
        let tempresponsedata = recieveddata;
      console.log("Searchresponse---",tempresponsedata)
      this.search=tempresponsedata;
      this.tax_invoice=this.search.tax_invoice;
      this.pure_agent=this.search.pure_agent;
      this.commercial_cn_dn= this.search.commercial_cn_dn;
      this.debit_note=this.search.debit_note;
      this.credit_note=this.search.credit_note;
      this.bill_of_supply=this.search.bill_of_supply;

      this.tax_invoice.headers.forEach((item, index) => {
        // console.log(item); // 1, 2, 3
       if(item.sortable=="true"){
        item.sortable=true;
        item.filter=true;
        item.resizable=true;
        item.suppressAutoSize=true;
        item.suppressSizeToFit=true;
        // item.cellStyle={color: 'red', 'background-color': 'green'}
       }
      });
      this.tax_invoice.data.forEach((item, index) => {
        // console.log(item); // 1, 2, 3
       if(item.invoice_date!=""){
        let from_state_codeValue = Number(item.from_state_code);
        let to_state_codeValue = Number(item.to_state_code);
        let gm_id_gst_code = Number(item.gm_id_gst_code);
        let hsn = Number(item.hsn);
        let invoice_version = Number(item.invoice_version);
        let assc_number = Number(item.assc_number);
        let insurance_charges = Number(item.insurance_charges);
        let labour_welfare_fund = Number(item.labour_welfare_fund);
        let edli_admin_charges = Number(item.edli_admin_charges);
        let workman_compensation = Number(item.workman_compensation);
        let CTC = Number(item.CTC);
        let reimbursement = Number(item.reimbursement);
        let insurance_others_ctc = Number(item.insurance_others_ctc);
        let gtl_cost = Number(item.gtl_cost);
        let sourcing_fee = Number(item.sourcing_fee);
        let others = Number(item.others);
        let loan_recovery = Number(item.loan_recovery);
        let advance_recovery = Number(item.advance_recovery);
        let imprest_recovery = Number(item.imprest_recovery);
        let setup_fees = Number(item.setup_fees);
        let pf_service_charges = Number(item.pf_service_charges);
        let absorption_fee = Number(item.absorption_fee);
        let mark_up = Number(item.mark_up);
        let bbo_cost = Number(item.bbo_cost);
        let hiring_cost = Number(item.hiring_cost);
        let on_site_cost = Number(item.on_site_cost);
        let on_campus_cost = Number(item.on_campus_cost);
        let online_training_cost = Number(item.online_training_cost);
        let imprest_payment = Number(item.imprest_payment);
        let loan_payment = Number(item.loan_payment);
        let cand_sourcing_fee = Number(item.cand_sourcing_fee);
        let dws_markup = Number(item.dws_markup);
        let one_time_revenue = Number(item.one_time_revenue);
        let recurring_revenue = Number(item.recurring_revenue);
        let govt_fee = Number(item.govt_fee);
        let associate_charges = Number(item.associate_charges);
        let payroll_fee = Number(item.payroll_fee);
        let sourcing_fee_1 = Number(item.sourcing_fee_1);
        let project_fee = Number(item.project_fee);
        let other_income = Number(item.other_income);
        let asset_transfer = Number(item.asset_transfer);
        let deposit_amount = Number(item.deposit_amount);
        let contigenct_deduction = Number(item.contigenct_deduction);
        let taxable = Number(item.taxable);
        let gross = Number(item.gross);
        let s_tax_14_percentage = Number(item.s_tax_14_percentage);
        let cess_0_percentage = Number(item.cess_0_percentage);
        let se_cess_0_percentage = Number(item.se_cess_0_percentage);
        let sb_cess_0_5_percentage = Number(item.sb_cess_0_5_percentage);
        let kk_cess_0_5_percentage = Number(item.kk_cess_0_5_percentage);
        let sgst_ugst = Number(item.sgst_ugst);
        let cgst= Number(item.cgst);
        let igst = Number(item.igst);
        let bus_deduction = Number(item.bus_deduction);
        let food_deduction = Number(item.food_deduction);
        let other_deduction = Number(item.other_deduction);
        let notice_recovery = Number(item.notice_recovery);
        let invoice_total = Number(item.invoice_total);;


        item.from_state_code=from_state_codeValue;
        item.to_state_code=to_state_codeValue;
        item.from_state_code=gm_id_gst_code;
        item.hsn=hsn;
        item.invoice_version=invoice_version;
        item.assc_number=assc_number;
        item.insurance_charges=insurance_charges;
        item.labour_welfare_fund=labour_welfare_fund;
        item.edli_admin_charges=edli_admin_charges;
        item.workman_compensation=workman_compensation;
        item.CTC=CTC;
        item.reimbursement=reimbursement;
        item.insurance_others_ctc=insurance_others_ctc;
        item.gtl_cost=gtl_cost;
        item.sourcing_fee=sourcing_fee;
        item.others=others;
        item.loan_recovery=loan_recovery;
        item.advance_recovery=advance_recovery;
        item.imprest_recovery=imprest_recovery;
        item.setup_fees=setup_fees;
        item.pf_service_charges=pf_service_charges;
        item.absorption_fee=absorption_fee;
        item.mark_up=mark_up;
        item.bbo_cost=bbo_cost;
        item.hiring_cost=hiring_cost;
        item.on_site_cost=on_site_cost;
        item.on_campus_cost=on_campus_cost;
        item.online_training_cost=online_training_cost;
        item.imprest_payment=imprest_payment;
        item.loan_payment=loan_payment;
        item.cand_sourcing_fee=cand_sourcing_fee;
        item.dws_markup=dws_markup;
        item.one_time_revenue=one_time_revenue;
        item.recurring_revenue=recurring_revenue;
        item.govt_fee=govt_fee;
        item.associate_charges=associate_charges;
        item.payroll_fee=payroll_fee;
        item.sourcing_fee_1=sourcing_fee_1;
        item.project_fee=project_fee;
        item.other_income=other_income;
        item.asset_transfer=asset_transfer;
        item.deposit_amount=deposit_amount;
        item.contigenct_deduction=contigenct_deduction;
        item.taxable=taxable;
        item.gross=gross;
        item.s_tax_14_percentage=s_tax_14_percentage;
        item.cess_0_percentage=cess_0_percentage;
        item.se_cess_0_percentage=se_cess_0_percentage;
        item.sb_cess_0_5_percentage=sb_cess_0_5_percentage;
        item.kk_cess_0_5_percentage=kk_cess_0_5_percentage;
        item.sgst_ugst=sgst_ugst;
        item.cgst=cgst;
        item.igst=igst;
        item.bus_deduction=bus_deduction;
        item.food_deduction=food_deduction;
        item.other_deduction=other_deduction;
        item.notice_recovery=notice_recovery;
        item.invoice_total=invoice_total;


       }
      });

      this.pure_agent.headers.forEach((item, index) => {
        // console.log(item); // 1, 2, 3
       if(item.sortable=="true"){
        item.sortable=true;
        item.filter=true;
        item.resizable=true;
        item.suppressAutoSize=true;
        item.suppressSizeToFit=true;
        // item.cellStyle={color: 'red', 'background-color': 'green'}
       }
      });
      this.commercial_cn_dn.headers.forEach((item, index) => {
        // console.log(item); // 1, 2, 3
       if(item.sortable=="true"){
        item.sortable=true;
        item.filter=true;
        item.resizable=true;
        item.suppressAutoSize=true;
        item.suppressSizeToFit=true;
        // item.cellStyle={color: 'red', 'background-color': 'green'}
       }
      });
      this.debit_note.headers.forEach((item, index) => {
        // console.log(item); // 1, 2, 3
       if(item.sortable=="true"){
        item.sortable=true;
        item.filter=true;
        item.resizable=true;
        item.suppressAutoSize=true;
        item.suppressSizeToFit=true;
        // item.cellStyle={color: 'red', 'background-color': 'green'}
       }
      });
      this.credit_note.headers.forEach((item, index) => {
        // console.log(item); // 1, 2, 3
       if(item.sortable=="true"){
        item.sortable=true;
        item.filter=true;
        item.resizable=true;
        item.suppressAutoSize=true;
        item.suppressSizeToFit=true;
        // item.cellStyle={color: 'red', 'background-color': 'green'}
       }
      });
      this.bill_of_supply.headers.forEach((item, index) => {
        // console.log(item); // 1, 2, 3
       if(item.sortable=="true"){
        item.sortable=true;
        item.filter=true;
        item.resizable=true;
        item.suppressAutoSize=true;
        item.suppressSizeToFit=true;
        // item.cellStyle={color: 'red', 'background-color': 'green'}
       }
      });
      // this.searchlist=this.search;
      this.consolreport=true;
// this.loader=false;
this.ngxService.stop();
      setTimeout(() => {
       
      }, 500);
    
    
    },
    (error: any) => { this.HandleErrorResponse(error) });

  }
  exportconsolidationexcel(param){
    if(param=='Tax Invoice'){
      this.excelService.exportAsExcelFile(this.tax_invoice.data, " Tax Invoice");
    }
    else  if(param=='Pure Agent'){
      this.excelService.exportAsExcelFile(this.pure_agent.data, " Pure Agent");
    }
    else  if(param=='Commercial CN & DN'){
      this.excelService.exportAsExcelFile(this.commercial_cn_dn.data, " Commercial CN & DN");
    }
    else  if(param=='Debit Note'){
      this.excelService.exportAsExcelFile(this.debit_note.data, " Debit Note");
    }
    else  if(param=='Credit Note'){
      this.excelService.exportAsExcelFile(this.credit_note.data, " Credit Note");
    }
    else  if(param=='Bill Of Supply'){
      this.excelService.exportAsExcelFile(this.bill_of_supply.data, " Bill Of Supply");
    }

  }

  coonsolidationexport()
  {
    // console.log("BRSexportAsXLSX");  
  
      //  Cheques_Issued', 'Credits_IN_GL', 'Debits_IN_GL', 'Bank_Debits', 'Bank_Credits'
       this.excelService.ExportAsExcelFile(this.tax_invoice.data,this.pure_agent.data,this.commercial_cn_dn.data,this.debit_note.data,this.credit_note.data,this.bill_of_supply.data,'CONSOLIDATION DATA');
      //  this.dashboardService.hideSpinner();
      
  }

  private loadData() {

    if ($.fn.dataTable.isDataTable('#tableExport,#tableExport1,#tableExport2,#tableExport3,#tableExport4,#tableExport5')) {
      $('#tableExport,#tableExport1,#tableExport2,#tableExport3,#tableExport4,#tableExport5').DataTable();
    }
    else {
      $('#tableExport').DataTable({
   
         dom: 'Bfrtip', 
        // buttons: ['pdf'],
        buttons: [
        'excel',
          'pdf',
          'print'
      ],
        // buttons: [],
        "pageLength": 10,
        "scrollX": true,
        "scrollY": true,
         "lengthChange": true,
          "lengthMenu": [10, 25, 50, 75, 100 ],
        "bFilter": true,
        "bInfo": true,
        "order": [], //to disable inital sort
        drawCallback: () => {
       
         }
      });
      $('#tableExport1').DataTable({
   
        dom: 'Bfrtip', 
       // buttons: ['pdf'],
       buttons: [
       'excel',
         'pdf',
         'print'
     ],
       // buttons: [],
       "pageLength": 10,
       "scrollX": true,
       "scrollY": true,
        "lengthChange": true,
         "lengthMenu": [10, 25, 50, 75, 100 ],
       "bFilter": true,
       "bInfo": true,
       "order": [], //to disable inital sort
       drawCallback: () => {
      
        }
     });
     $('#tableExport2').DataTable({
   
      dom: 'Bfrtip', 
     // buttons: ['pdf'],
     buttons: [
     'excel',
       'pdf',
       'print'
   ],
     // buttons: [],
     "pageLength": 10,
     "scrollX": true,
     "scrollY": true,
      "lengthChange": true,
       "lengthMenu": [10, 25, 50, 75, 100 ],
     "bFilter": true,
     "bInfo": true,
     "order": [], //to disable inital sort
     drawCallback: () => {
    
      }
   });
   $('#tableExport3').DataTable({
   
    dom: 'Bfrtip', 
   // buttons: ['pdf'],
   buttons: [
   'excel',
     'pdf',
     'print'
 ],
   // buttons: [],
   "pageLength": 10,
   "scrollX": true,
   "scrollY": true,
    "lengthChange": true,
     "lengthMenu": [10, 25, 50, 75, 100 ],
   "bFilter": true,
   "bInfo": true,
   "order": [], //to disable inital sort
   drawCallback: () => {
  
    }
 });
 $('#tableExport4').DataTable({
   
  dom: 'Bfrtip', 
 // buttons: ['pdf'],
 buttons: [
 'excel',
   'pdf',
   'print'
],
 // buttons: [],
 "pageLength": 10,
 "scrollX": true,
 "scrollY": true,
  "lengthChange": true,
   "lengthMenu": [10, 25, 50, 75, 100 ],
 "bFilter": true,
 "bInfo": true,
 "order": [], //to disable inital sort
 drawCallback: () => {

  }
});
$('#tableExport5').DataTable({
   
  dom: 'Bfrtip', 
 // buttons: ['pdf'],
 buttons: [
 'excel',
   'pdf',
   'print'
],
 // buttons: [],
 "pageLength": 10,
 "scrollX": true,
 "scrollY": true,
  "lengthChange": true,
   "lengthMenu": [10, 25, 50, 75, 100 ],
 "bFilter": true,
 "bInfo": true,
 "order": [], //to disable inital sort
 drawCallback: () => {

  }
});
    }
  }

  tabclick(param){
    this.Tabval="";
this.Tabval=param;
console.log(this.Tabval);
  }

  HandleErrorResponse(err: any)
  {
    //  this.objerrhandler.handleError(String(err));
   console.log("Error",err);
  }

}
