import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CommonService } from './common.service';
// import { Util } from './Util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ConsolidationdocprocessService{
  lstReturn: any;
  public  port="10003";
  // public  port1="10002";

  constructor(private httpClient: HttpClient, private router: Router, 
    // private Util: Util, 
    private CS: CommonService) {
  }

  
  getConsolidationFileProcesslistFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/consolidation_files/validated_data/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  getConsolidationFileProcessFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/consolidation_files/store_files/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

//   postFileToServer(prminputs) {
//     var resData = CommonService.authReq(this.port+'/consolidation_files/upload_files/');
//     return this.CS.SendFileToAPI("post", resData, prminputs);
//   }

}
