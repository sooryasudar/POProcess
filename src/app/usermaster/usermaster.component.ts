import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UsermasterService } from '../service/usermaster.service';
import { HttpClient  } from '@angular/common/http';
declare const $: any;
@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css']
})
export class UsermasterComponent implements OnInit {

  public userview
  public cardTitle;
  public objuser;
  public userdata;
  public user_list;
  public active_list;
  public user;
  public editBtnshow;
  public usermaindata;
  public userlist;

  constructor(private router: Router,private objservice:UsermasterService,public http:HttpClient) { }


  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    this.objuser= {"user_id":0,"mail_id":"","department":"","reporting_manager":""};
    this.userview=true;
  
    this.getusernamelist();
  }

  getusernamelist(){

    let Indata={
      "user_id": this.user.user_id,
          
    }
    console.log("inputuser",Indata);
    this.objservice.getusernameFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("userlistresponse---",tempresponsedata)
      this.userdata=tempresponsedata;
      this.active_list=this.userdata.active_list;
      this.user_list=this.userdata.user_list;

      setTimeout(() => {
        this.loadData();
           }, 300);
    });
  }

  getuserdetails(param){
   
    this.user_list.forEach((item, index) => {

      if(item.user_id==param){
        item.checkboxSelection= true;
        this.objuser.mail_id=item.mail_id;
        this.objuser.department=item.department;
        this.objuser.reporting_manager=item.reporting_manager;       
        }    
    });
  }

  list(){
    this.userview=true;
    this.getusernamelist();
  
  }
  backlist(){
    this.userview=false;
    this.objuser= [];
  
  }

  saveuserdetails(){

    let Indata={
      "user_id": this.objuser.user_id,
      "mail_id": this.objuser.mail_id          
    }
    console.log("inputuser",Indata);
    this.objservice.postuserdataFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("userresponse---",tempresponsedata)
    
      this.objuser= {"user_id":0,"mail_id":"","department":"","reporting_manager":""};
      this.userview=true;     
    });
  }

  cancelEdit(){

  }

  deleteuserdetail(param){
    let Indata={
      "user_id": param.user_id,
      "mail_id": param.mail_id          
    }
    console.log("inputuser",Indata);
    this.objservice.deleteuserdataFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("userdeleteresponse---",tempresponsedata)
    this.getusernamelist();
       
    });

  }

  private loadData() {

    if ($.fn.dataTable.isDataTable('#tablesourceExport')) {
      $('#tablesourceExport').DataTable();
    }
    else {
      $('#tablesourceExport').DataTable({
        // dom: 'Bfrtip',
        // buttons: ['pdf'],
        buttons: [],
        "pageLength": 10,
        "paging": true,
        "bFilter": true,
        "bInfo": true,
        "order": [], //to disable inital sort
        drawCallback: () => {
         
         }
      });
    }
  }

}
