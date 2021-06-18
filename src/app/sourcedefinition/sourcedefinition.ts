export class Sourcedefinition {

    constructor(
      public source_definition_id: number=0,
      public attribute_name: string='',
      public attribute_position: number= 0,
      public attribute_data_type: string='',
      public attribute_date_format: string='',
      public validate_field: string='',
      public required_field: string='',
      public unique_field: string='',
      public editable_field: string='',

         ) {  }

  }