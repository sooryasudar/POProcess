import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { CommonService } from './common.service';
// import { Util } from './Util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsermasterService{
  lstReturn: any;
  public  port="10001";
  // public  port1="10002";

  constructor(private httpClient: HttpClient, private router: Router, 
    // private Util: Util, 
    private CS: CommonService) {
  }

  
  getusernameFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/modules/user_list/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }

  postuserdataFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/modules/create_user/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }
  deleteuserdataFromServer(prminputs) {
    var resData = CommonService.authReq(this.port+'/modules/remove_user/');
    return this.CS.SendToAPI("post", resData, prminputs);
   
  }


 




}
