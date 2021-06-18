import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SourcedefinitionService } from '../service/sourcedefinition.service';
import { HttpClient  } from '@angular/common/http';
import{Sourcedefinition} from './sourcedefinition';

declare const $: any;
// import{Source} from './source';
@Component({
  selector: 'app-sourcedefinition',
  templateUrl: './sourcedefinition.component.html',
  styleUrls: ['./sourcedefinition.component.css']
})
export class SourcedefinitionComponent implements OnInit {


  public userdtl;
  public user;
  public sourcedata;
  public sourcelist;
  public sourcedefinitionlist: Array<any> = [];
  public newsourcedefinitionlist;
  public objsource;
  public operationflag;
  public sourceview;
  public sourcedefinition;

  constructor(private router: Router,private objservice:SourcedefinitionService,public http:HttpClient) { }

  ngOnInit() {
    this.userdtl=JSON.parse(localStorage.getItem('useracess'));
    this.user=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.user);
    this.objsource={"source_id":0}
    // this.sourcedefinitionlist={"source_definiton_id":0,"attribute_name":"","attribute_position":0,"attribute_datatype":"","date_format":"","validate":"","required":"","unique":"","editable":""};
    this.newsourcedefinitionlist={"source_definiton_id":1,"attribute_name":"","attribute_position":0,"attribute_data_type":"","attribute_date_format":"","validate_field":"","required_field":"","unique_field":"","editable_field":""};
   this.operationflag="SND"
   this.sourceview=false;
    this.getsourcelist();
  }

  list(){
    this.operationflag="SD"
    this.sourceview=true;
    this.sourcedefinitionlist=[];
    this.getsourcelist();
  }
  backlist(){
    this.operationflag="SND"
    this.sourceview=false;
    this.sourcedefinitionlist=[];
    this.getsourcelist();
  }

  getsourcelist(){
    let Indata={
      "tenant_id": this.userdtl.tenant_id,
      "group_id": this.userdtl.group_id,
      "entity_id": this.userdtl.entity_id,
      "module_id": this.userdtl.module_id,
      "operation_flag":this.operationflag   
    }
    console.log("inputsource",Indata);
    this.objservice.getsourceFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("Sourcelistresponse---",tempresponsedata)
      this.sourcedata=tempresponsedata;
      this.sourcelist=this.sourcedata.source_list;
      console.log("Sourcelist---",this.sourcelist)

    });
  }

  editsourcedefinitionlist(){
    this.sourceview=false;
  }

  addFieldValue(data?) {
    //console.log(this.newOtherCost)
    this.sourcedefinitionlist.push(this.newsourcedefinitionlist);
    let getLength = this.sourcedefinitionlist.length - 1;    
    this.newsourcedefinitionlist={"source_definiton_id":data.source_definiton_id+1,"attribute_name":"","attribute_position":0,"attribute_data_type":"","attribute_date_format":"","validate_field":"","required_field":"","unique_field":"","editable_field":""};
  
    // this.boolDisableOtherCostBtn = false; 
  }

  deleteFieldValue(index) {
    this.sourcedefinitionlist.splice(index, 1);
    // this.costVendorTypeArray.splice(index, 1);    
  }			
  clearSourceFields() {
    this.newsourcedefinitionlist={"source_definiton_id":1,"attribute_name":"","attribute_position":0,"attribute_data_type":"","attribute_date_format":"","validate_field":"","required_field":"","unique_field":"","editable_field":""};

    // this.boolDisableOtherCostBtn = true;
  }
  sourceselection(param){

    console.log("flag",this.operationflag);
    if(this.operationflag=="SD"){
      
    let Indata={
      "tenant_id": this.userdtl.tenant_id,
      "group_id": this.userdtl.group_id,
      "entity_id": this.userdtl.entity_id,
      "module_id": this.userdtl.module_id,
      "source_id": param    
    }
    console.log("inputsource",Indata);
    this.objservice.getsourcedefinitionFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("Sourcedefinitionlistresponse---",tempresponsedata)
      
      this.sourcedefinition=tempresponsedata;
       this.sourcedefinitionlist=this.sourcedefinition.data;

      //  this.sourcedefinitionlist.push(this.sourcedefinition.data);
      console.log("Sourcelist---",this.sourcedefinitionlist[0])

    });
  }
  else{
    this.sourcedefinitionlist=[];
    this.newsourcedefinitionlist={"source_definiton_id":1,"attribute_name":"","attribute_position":0,"attribute_data_type":"","attribute_date_format":"","validate_field":"","required_field":"","unique_field":"","editable_field":""};
    
  }
}

  savesourcedefinitionlist(){
    // console.log("newsourcelist",this.newsourcedefinitionlist);
    // console.log("newsourcelist",this.newsourcedefinitionlist.attribute_name);
// if(this.newsourcedefinitionlist.attribute_name=!""){
//   this.sourcedefinitionlist.push(this.newsourcedefinitionlist);
// }

// if(this.objsource.source_id==0){
// alert("Select Source to save");
// // return false;
// }
// else{

this.senddatatoserver();

   
  }

  senddatatoserver(){
    let Indata={

      "tenant_id": this.userdtl.tenant_id,
      "group_id": this.userdtl.group_id,
      "entity_id": this.userdtl.entity_id,
      "user_id": this.user.user_id,
      "module_id": this.userdtl.module_id,      
      "source_id": this.objsource.source_id,
      "source_list": this.sourcedefinitionlist,
       }

    console.log("inputsavesource",Indata);
    this.objservice.postsourcedefinitionFromServer(Indata)
    .subscribe(
    recieveddata  => {
      let tempresponsedata = recieveddata;
      console.log("Sourceresponse---",tempresponsedata)
    // this.objsource= new Source();

    });
  }
  

}
