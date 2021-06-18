import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ConsolidationdocprocessService } from '../service/consolidationprocess.service';
import { HttpClient  } from '@angular/common/http';
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
declare const $: any;


@Component({
  selector: 'app-consolidationprocess',
  templateUrl: './consolidationprocess.component.html',
  styleUrls: ['./consolidationprocess.component.css']
})
export class ConsolidationprocessComponent implements OnInit {

  public consolidation
  public consolidationlist;
  public userdtl;
  public user;
  public SpinnerOn;

  constructor(private router: Router,private objservice:ConsolidationdocprocessService,private ngxService: NgxUiLoaderService,public http:HttpClient) { }

  ngOnInit() {
    this.userdtl=JSON.parse(localStorage.getItem('useracess'));
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.user);
    this.getconsolidationdata();
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
    this.objservice.getConsolidationFileProcesslistFromServer(data)
    .subscribe(
    recieveddata  => {
   
        let tempresponsedata = recieveddata;
      console.log("consolidationprocesslist---",tempresponsedata)
      this.consolidation=tempresponsedata;
      this.consolidationlist=this.consolidation.data;
      // this.menulist=tempresponsedata;
        setTimeout(() => {
        this.loadData();
           }, 500);
    
    },
    (error: any) => { this.HandleErrorResponse(error) });

  }

  Processconsolidation(doc){
    this.ngxService.start(); 
let data={
  "file_id": doc.id
}

console.log("input",data);
    this.objservice.getConsolidationFileProcessFromServer(data)
    .subscribe(
    recieveddata  => {
   
        let tempresponsedata = recieveddata;
      console.log("consolidationprocess---",tempresponsedata)
      this.consolidation=tempresponsedata;
      // this.consolidation.data;

      if(this.consolidation.Status=="Success"){
        this.getconsolidationdata();
         this.ngxService.stop();
              }
              else{
                this.ngxService.stop();        
              }
      // this.menulist=tempresponsedata;
    
    },
    (error: any) => { this.HandleErrorResponse(error) });

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
        "paging": true,
        "scrollX": true,
        "scrollY":"70vh",
        "bFilter": true,
        "bInfo": true,
        "order": [], //to disable inital sort
        drawCallback: () => {
          $('.paginate_button.next').on('click', () => {
          
          $('#tableExport').DataTable().clear().destroy();
              // this.loadnextcompanylist();
            });
            // $('.paginate_button.previous').on('click', () => {
          
            //   $('#tableExport').DataTable().clear().destroy();
            //       this.loadpreviouscompanylist();
            //     });
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
