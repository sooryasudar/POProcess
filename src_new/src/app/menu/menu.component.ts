import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,private objservice:AuthenticateService,public http:HttpClient) { }

  public userdtl;
  public menulist;
  ngOnInit() {
    this.menulist={"main_models":{"main_model_id":0,"module_name":""},
                    "sub_models":{"sub_model_id":0,"main_model_id":0,"sub_model_name":"","url_path":"","page_limit":0},
                    "tenant_id":0,"group_id":0,"entity_id":0,"module_id":0,"tenant_extension":""
                  }
    this.userdtl=JSON.parse(localStorage.getItem('Userdtl'));
    console.log("userdtl",this.userdtl);
    this.Menudetails();
  }


  Menudetails(){
    // alert("event");
    
    let data = {

      "user_id": this.userdtl.user_id,
     
    }
  

    this.objservice.getMenuFromServer(data)
    .subscribe(
    recieveddata  => {
   
        let tempresponsedata = recieveddata;
      console.log("Menuresponse---",tempresponsedata)
      this.menulist=tempresponsedata;
      localStorage.setItem('useracess',JSON.stringify(this.menulist))
    },
    (error: any) => { this.HandleErrorResponse(error) });
  }

  HandleErrorResponse(err: any)
  {
    //  this.objerrhandler.handleError(String(err));
   console.log("Error",err);
  }

}
