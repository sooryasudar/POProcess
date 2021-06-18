import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-poapprovaltracker',
  templateUrl: './poapprovaltracker.component.html',
  styleUrls: ['./poapprovaltracker.component.css']
})
export class PoapprovaltrackerComponent implements OnInit {

  constructor() { }

  public cardTitle="Approval Tracker";
  public objporeq;
  public boolPoreqList=false;
  public porequirementdetail;
  public porequirmentDetails;
  public comment;
  public quatation1= "AGS Group of company quatation value =542786";
  public quatation2= "KCG Group of company quatation value =9989768";
  public quatation3="VSS Group of company quatation value =7665555";
  

  
  public jsondata={
    "records": [{
      "requirementdate": "2021-03-05",
      "department": "ADMIN",
      "purpose": "Water Bottles",
      "purchasecategory": "Use and Through",
      "approxvalue": 1000.00,
      "description": "Water Bootle Purchase",
      "receivedbenefit": "Water Bottles To Employees",
      "info": [{
        "materialname": "Water Bottle",
        "description": "Water Bottle",
        "quantity": 100,
        "approxunitvalue": 10.00,
        "approxtotalvalue": 1000.00
      }]
    }, {
      "requirementdate": "2021-03-06",
      "department": "ADMIN",
      "purpose": "Water Bottles and Towels",
      "purchasecategory": "Use and Through",
      "approxvalue": 2000.00,
      "description": "Water Bootle and Towels Purchase",
      "receivedbenefit": "Water Bottles and Towels To Employees",
      "info": [{
          "materialname": "Water Bottle",
          "description": "Water Bottle",
          "quantity": 100,
          "approxunitvalue": 10.00,
          "approxtotalvalue": 1000.00
        },
        {
          "materialname": "Towels",
          "description": "Towels",
          "quantity": 100,
          "approxunitvalue": 10.00,
          "approxtotalvalue": 1000.00
        }
      ]
    }, {
      "requirementdate": "2021-03-04",
      "department": "ADMIN",
      "purpose": "Pen and Paper",
      "purchasecategory": "Stationery",
      "approxvalue": 1000.00,
      "description": "Pen and Paper for Employees",
      "receivedbenefit": "Usage of Works and Printing",
      "info": [{
          "materialname": "Pen",
          "description": "Pen",
          "quantity": 50,
          "approxunitvalue": 10.00,
          "approxtotalvalue": 500.00
        },
        {
          "materialname": "Papers",
          "description": "A4 Sheet for Printouts and works",
          "quantity": 500,
          "approxunitvalue": 1.00,
          "approxtotalvalue": 500.00
        }
      ]
    }, {
      "requirementdate": "2021-03-03",
      "department": "ADMIN",
      "purpose": "Mobile Phone",
      "purchasecategory": "Phone",
      "approxvalue": 20000.00,
      "description": "Mobile Phone for Gift",
      "receivedbenefit": "Gift to the Chief guest",
      "info": [{
        "materialname": "Mobile Phone",
        "description": "OnePlus Mobile Phone series 9",
        "quantity": 1,
        "approxunitvalue": 42999.00,
        "approxtotalvalue": 42999.00
      }]
    }, {
      "requirementdate": "2021-03-02",
      "department": "ADMIN",
      "purpose": "Food",
      "purchasecategory": "Food",
      "approxvalue": 25000.00,
      "description": "Food for Admin Staffs",
      "receivedbenefit": "Food for Admin Staffs",
      "info": [{
        "materialname": "Food",
        "description": "Food for Admin Staffs",
        "quantity": 1,
        "approxunitvalue": 25000.00,
        "approxtotalvalue": 25000.00
      }]
    }]
  }

  ngOnInit() {

    this.porequirementdetail=this.jsondata.records;
  }


  ShowPorequirementdetail(data){
this.objporeq=data;
this.porequirmentDetails=this.objporeq.info;
    this.boolPoreqList=true;
  }
  openModal(){
    $("#modal_approval").modal("show");

  }

  approveorder(){
    $("#modal_approval").modal("hide");
  }
  rejectorder(){
    $("#modal_approval").modal("hide");

  }

  list(){
  this.boolPoreqList=false;

  }


}

