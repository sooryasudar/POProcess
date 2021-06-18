export class Source {

    constructor(
      public source_id: number=0,
      public source_name: string='',
      public source_extension: string= '',
      public sheet_name: string='',
      public column_start_row: number=0,
      public password_protected: string='',
      public source_password: string='',
         ) {  }

  }