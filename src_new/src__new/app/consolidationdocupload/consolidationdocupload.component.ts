import { Component, OnInit,VERSION, ViewChild, ElementRef } from "@angular/core";
import {Router} from '@angular/router';
import { ConsolidationdocuploadService } from '../service/consolidationdocupload.service';
import { HttpClient  } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
declare const $: any;

@Component({
  selector: 'app-consolidationdocupload',
  templateUrl: './consolidationdocupload.component.html',
  styleUrls: ['./consolidationdocupload.component.css']
})
export class ConsolidationdocuploadComponent implements OnInit {
  
  constructor(private router: Router,private objservice:ConsolidationdocuploadService,
    private ngxService: NgxUiLoaderService,public http:HttpClient) { }


    // name = "Angular " + VERSION.major;
    // @ViewChild("myNameElem") myNameElem: ElementRef;
  public userdtl;
  public objconsoldoc;
  public sourcedata;
  public sourcelist;
  public fileupload;
  public user;
  public consolidation
  public consolidationlist;
  public consolidationpreview;
  public consolidationpreviewlist;
  public consolidationpreviewheaderlist;
  public pagination;
  public paginationPageSize;
  // form: FormGroup; 
   @ViewChild('fileInput',{  
    static: true  
}) fileInput: ElementRef ;

//   @ViewChild('txtname', {  
//     static: true  
// }) mytxt: ElementRef  
  ngOnInit() {
    this.userdtl=JSON.parse(localStorage.getItem('useracess'));
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.user);
this.objconsoldoc={"sourceid":0};
this.consolidationlist=[];
    this.getsourcelist();
  this.getconsolidationdata();
  // enables pagination in the grid
this.pagination = true;
// sets 10 rows per page (default is 100)
this.paginationPageSize = 10;
  }


  getsourcelist(){
    let Indata={
      "tenant_id": this.userdtl.tenant_id,
      "group_id": this.userdtl.group_id,
      "entity_id": this.userdtl.entity_id,
      "module_id": this.userdtl.module_id,
      "operation_flag":"SD"        
    }
    console.log("inputsource",Indata);
    this.objservice.getsourceFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("Sourcelistresponse---",tempresponsedata)
      this.sourcedata=tempresponsedata;
      this.sourcelist=this.sourcedata.source_list;
    });
  }

  getconsolidationdata(){

    let data = {

      "user_id": this.user.user_id,
      "tenant_id": this.userdtl.tenant_id,
      "group_id": this.userdtl.group_id,
      "entity_id": this.userdtl.entity_id,
      "module_id": this.userdtl.module_id           
    }
  
console.log("input",data);
    this.objservice.getConsolidationFilelistFromServer(data)
    .subscribe(
    recieveddata  => {
   
        let tempresponsedata = recieveddata;
      console.log("consolidationlist---",tempresponsedata)
      this.consolidation=tempresponsedata;
      this.consolidationlist=this.consolidation.data;
      // this.menulist=tempresponsedata;
      
      $('#tableExport').DataTable().clear().destroy();
        setTimeout(() => {
           this.loadData();
                 }, 500);
    },
    (error: any) => { this.HandleErrorResponse(error) });

  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'csv' || ext.toLowerCase() == 'xlsb' ) {
        return true;
    }
    else {
        return false;
    }
}



  upload(files){
    console.log("sourceid",files[0]);
    if (!this.validateFile(files[0].name)) {
      alert('Selected file format is not supported');   
      return false;
  }
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("source_id", this.objconsoldoc.source_id);
    formData.append("tenant_id", this.userdtl.tenant_id);
    formData.append("group_id", this.userdtl.group_id);
    formData.append("entity_id", this.userdtl.entity_id);
    formData.append("module_id", this.userdtl.module_id);
    formData.append("user_id", this.user.user_id);

    this.fileupload=formData;    
  }
  saveconsolidationfile(){
this.ngxService.start(); 
     console.log("sourceid",this.objconsoldoc.source_id);
console.log("saveconsolidation",this.fileupload);
    this.objservice.postFileToServer(this.fileupload)
    .subscribe(
    recieveddata  => {   
        let tempresponsedata = recieveddata;
      console.log("Fileuploadresponse---",tempresponsedata)
      this.fileupload="";
      this.fileupload=tempresponsedata;
      this.fileInput.nativeElement.value='';
      this.getconsolidationdata();
      this.ngxService.stop();

      // if(this.fileupload.Status=="Success"){
      // }
      // else{

      // }
      // this.sourcelist=tempresponsedata;
      // this.menulist=tempresponsedata;
    
    },
    (error: any) => { this.HandleErrorResponse(error) });
  }
  previewconsoldoc(doc){
    if(doc.upload_status=="SUCCESS"){
this.ngxService.start(); 


      let data={
        "file_id": doc.id
      }
      
      console.log("previewinput",data);
          this.objservice.getConsolidationFilePreviewFromServer(data)
          .subscribe(
          recieveddata  => {
         
              let tempresponsedata = recieveddata;
            console.log("preview---",tempresponsedata)

           
             this.consolidationpreview=tempresponsedata;
            // this.consolidation.data;
      
             if(this.consolidationpreview.Status=="Success"){
               this.consolidationpreviewlist=this.consolidationpreview.data;
               this.consolidationpreviewheaderlist=this.consolidationpreview.headers;
              this.ngxService.stop();
              $("#consolidationpreview").modal("show");
              
              //  setTimeout(() => {
              //   this.loadData();
              //   // this.SpinnerOn = false;
              // }, 1000);

              

            //   this.getconsolidationdata();
            //         }
            //         else{
              
            //         }
            // this.menulist=tempresponsedata;
             }
          
          },
          (error: any) => { this.HandleErrorResponse(error) });

    }
    else{
alert("Need to do Consolidation Process to Preview");
    }

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
        "pageLength": 10,
       "paging": true,
       "scrollX": true,
       "scrollY":"70vh",
       "bFilter": true,
       "bInfo": true,
       "order": [], //to disable inital sort
       drawCallback: () => {
      
        }
     });
    }

  }

  closemodal(){
    $("#consolidationpreview").modal("hide");

  }

  HandleErrorResponse(err: any)
  {
    //  this.objerrhandler.handleError(String(err));
   console.log("Error",err);
  }
}
