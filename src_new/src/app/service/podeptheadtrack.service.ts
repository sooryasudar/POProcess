import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CommonService } from './common.service';
// import { Util } from './Util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PODeptheadtrackerService{
  lstReturn: any;
  public  port="10002";
  // public  port1="10002";

  constructor(private httpClient: HttpClient, private router: Router, 
    // private Util: Util, 
    private CS: CommonService) {
  }

  getpodeptheadlistFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/dept_head_prf_list/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  
  getpodeptheadbyidFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/dept_head_prf_input_fields/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  postapprovalPRFFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/dept_head_functionality/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

//   getporequirementFromServer(prminputs) {
//     var resData = CommonService.authReq(this.port+'/po_process/user_prf_list/');
//     return this.CS.SendToAPI("post", resData, prminputs);
   
//   }
//   getporequirementbyidFromServer(prminputs) {
//     var resData = CommonService.authReq(this.port+'/po_process/user_prf_input_fields/');
//     return this.CS.SendToAPI("post", resData, prminputs);
   
//   }

//   postporequirementbyidFromServer(prminputs) {
//     var resData = CommonService.authReq(this.port+'/po_process/edit_prf_form/');
//     return this.CS.SendToAPI("post", resData, prminputs);
   
//   }

//   postFileToServer(prminputs) {
//     var resData = CommonService.authReq(this.port+'/po_process/quotation_file_upload/');
//     return this.CS.SendFileToAPI("post", resData, prminputs);
//   }



}
