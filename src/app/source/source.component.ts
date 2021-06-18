import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SourceService } from '../service/source.service';
import { HttpClient  } from '@angular/common/http';
declare const $: any;
import{Source} from './source';
@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  public objsource:Source;

  public password;
  public userdtl;
  public user;
  public sourcedata;
  public sourcelist;
  public sourceview


  constructor(private router: Router,private objservice:SourceService,public http:HttpClient) { }

  ngOnInit() {
    this.userdtl=JSON.parse(localStorage.getItem('useracess'));
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.user);
    this.objsource= new Source();
    this.sourceview=true;
    this.password=false;  
    this.getsourcelist();
  }
list(){
  this.sourceview=true;
  this.getsourcelist();

}
backlist(){
  this.sourceview=false;
  this.objsource= new Source();

}

  passreq(val){
console.log("passreq",val);

if(val=="Yes"){
this.password=true;
}
else{
this.password=false;
this.objsource.source_password="";
}
  }

  getsourcelist(){
    let Indata={
      "tenant_id": this.userdtl.tenant_id,
      "group_id": this.userdtl.group_id,
      "entity_id": this.userdtl.entity_id,
      "module_id": this.userdtl.module_id,
      "operation_flag":"SELECT"      
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

  Editsourcedetail(param){
    this.objsource.source_id=param.source_id;
    this.objsource.source_name=param.source_name;
    this.objsource.source_extension=param.source_extension;
    this.objsource.sheet_name=param.sheet_name;
    this.objsource.column_start_row=param.column_start_row;
    this.objsource.password_protected=param.password_protected;
    this.objsource.source_password=param.source_password;   
    this.sourceview=false;

  }

  savesourcedetails(){

    let Indata={

      "tenant_id": this.userdtl.tenant_id,
      "group_id": this.userdtl.group_id,
      "entity_id": this.userdtl.entity_id,
      "user_id": this.user.user_id,
      "module_id": this.userdtl.module_id,
      "tenant_extension": this.userdtl.tenant_extension,
      "source_id": this.objsource.source_id,
      "source_name": this.objsource.source_name,
      "source_extension": this.objsource.source_extension,
      "sheet_name": this.objsource.sheet_name,
      "column_start_row": this.objsource.column_start_row ,
      "password_protected": this.objsource.password_protected,
      "source_password": this.objsource.source_password

    }

    console.log("inputsavesource",Indata);
    this.objservice.postsourceFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("Sourceresponse---",tempresponsedata)
    this.objsource= new Source();

    });
  }

}
