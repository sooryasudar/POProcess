import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CommonService } from './common.service';
// import { Util } from './Util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SourcedefinitionService{
  lstReturn: any;
  public  port="10003";
  // public  port1="10002";

  constructor(private httpClient: HttpClient, private router: Router, 
    // private Util: Util, 
    private CS: CommonService) {
  }

  
  postsourcedefinitionFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/consolidation_files/update_source_definitions/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  getsourceFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/consolidation_files/source_list/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  getsourcedefinitionFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/consolidation_files/source_definitions_list/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }


}
