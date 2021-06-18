import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CommonService } from './common.service';
// import { Util } from './Util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class P2PtrackerService{
  lstReturn: any;
  public  port="10002";
  // public  port1="10002";

  constructor(private httpClient: HttpClient, private router: Router, 
    // private Util: Util, 
    private CS: CommonService) {
  }

  getp2ptrackerlistFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/p2p_team_prf_list/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  
  getp2ptrackerbyidFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/p2p_team_prf_input_fields/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  postapprovalPRFFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/p2p_team_functionality/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  postFileToServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/po_process/po_file_upload/');
    return this.CS.SendFileToAPI("post", resData, prminputs);
  }



}
