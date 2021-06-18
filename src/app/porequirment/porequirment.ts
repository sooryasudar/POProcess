export class POrequirement {

    constructor(
      public requirement_id: number=0,
      public tenant_id: number=0,
      public group_id: number=0,
      public entity_id: number=0,
      public module_id: number=0,
      public user_id: number=0,
      public prf_number: string='',
      public user_name: string='',
      public location: string='',
      public requirement_date: Date= new Date(),
      public reporting_manager: string='',
      public department: string='',
      public budget_allocated: number=0,
      public is_budgeted: string='',
      public purpose: string='',
      public purchase_catagory: string='',
      public purchase_type: string='',
      public date_of_delivery_expected:string='',
      public delivery_address:string='',
      public perceived_benefits:string='',
      public payment_term:string='',
      public total_line_value: number=0,
      public finalized_vendor: string='',
      public vendor_selection_reason: string='',
      public is_processed: number=0,
      public approver_department: string='',
      public approver_mailid: string='',
      public approver_name: string='',
      public VendorFile_name: string='',
      public po_file_name: string='',
      public porequirementinfo: Array<POrequirementInfo> = [],
      public poquotation: Array<POquotation> = []


    ) {  }

  }

  export class POrequirementInfo {

    constructor(
      public poreqinfo_id: number=0,
      public material_name: string='',
      public budget_category: string='',
      public line_description: string='',
      public quantity: number=0,
      public unit_value: number=0,
      public total_value: number=0

      ) {  }

  }

  export class POquotation {

    constructor(
      public pobudget_id: number=0,
      public vendor_type: string='',
      public vendor_name: string='',
      public vendor_code: string='',
      public vendor_address : string='',
      public vendor_location: string='',
      public gst_number: string='',
      public vendor_emailid: string='',
      public vendor_total_line_value: number=0,
      public quotationfile_name: string='',
      public VendorFile_name: string='',
      public quotation: Array<POquotationinfo> = []

      ) {  }

  }

  export class POquotationinfo {

    constructor(
      public pobudget_id: number=0,
      public pobudgetinfo_id: number=0,
      public vendor_material_name: string='',
      public vendor_line_description: string='',
      public vendor_quantity: number=0,
      public vendor_unit_value: number=0,
      public vendor_total_value: number=0

      ) {  }

  }