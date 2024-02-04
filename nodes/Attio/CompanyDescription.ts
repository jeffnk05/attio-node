import { INodeProperties } from "n8n-workflow";

export const companyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['company'],
			}
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a company record'
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a company record',
				routing: {
					request: {
						method: 'POST',
						url: '=/v2/objects/companies/records',
					}
				}
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a comapny record',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v2/objects/companies/records'
					},
				}
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a company record',
			}
		],
		default: 'get'
	}
]

const getOperations: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordID',
		type: 'string',
		description: 'Input the record ID',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['get'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/v2/objects/companies/records/{{encodeURIComponent($value)}}',
			},
		},
		required: true,
		default: '',
	},
];

const createOperations: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create']
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'data.values.name[0].value',
			}
		}
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['create']
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'data.values.domains[0].domain',
			}
		}
	}
];

const updateOperations: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordID',
		type: 'string',
		description: 'Input the record ID',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['update'],
			},
		},
		routing: {
			request: {
				method: 'PATCH',
				url: '=/v2/objects/companies/records/{{encodeURIComponent($value)}}',
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Company Properties',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add property',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['update']
			}
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'data.values.name[0].value',
					}
				}
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'data.values.domains[0].domain',
					}
				}
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'body',
						property: 'data.values.description[0].value',
					}
				}
			},
		],
	}
]

const deleteOperations: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordID',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['company'],
				operation: ['delete'],
			},
		},
		routing: {
			request: {
				method: 'DELETE',
				url: '=/v2/objects/companies/records/{{encodeURIComponent($value)}}',
			},
			output: {
				postReceive: [
					{
						type: 'set',
						properties: {
							value: '={{ { "success": true } }}', // Also possible to use the original response data
						},
					},
				],
			}
		},
		required: true,
		default: ''
	}
]

export const companyFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                company:get                              		*/
	/* -------------------------------------------------------------------------- */
	...getOperations,
	/* -------------------------------------------------------------------------- */
	/*                                company:create                              */
	/* -------------------------------------------------------------------------- */
	...createOperations,
	/* -------------------------------------------------------------------------- */
	/*                               company:update                              	*/
	/* -------------------------------------------------------------------------- */
	...updateOperations,
	/* -------------------------------------------------------------------------- */
	/*                               company:delete                              	*/
	/* -------------------------------------------------------------------------- */
	...deleteOperations,
];
