import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CommonService } from './common.service';
// import { Util } from './Util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class POfinancetrackerService{
  lstReturn: any;
  public  port="10002";
  // public  port1="10002";

  constructor(private httpClient: HttpClient, private router: Router, 
    // private Util: Util, 
    private CS: CommonService) {
  }

  getpofinancetrackerlistFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/finance_prf_list/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  
  getpofinancetrackerbyidFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/finance_prf_input_fields/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  postapprovalPRFFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/finance_functionality/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  getoverallFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/admin_list/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }




}
