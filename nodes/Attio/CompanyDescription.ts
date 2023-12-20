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

export const companyFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                company:get                              		*/
	/* -------------------------------------------------------------------------- */
	...getOperations,
	/* -------------------------------------------------------------------------- */
	/*                                company:create                              */
	/* -------------------------------------------------------------------------- */
	//...createOperations,
	/* -------------------------------------------------------------------------- */
	/*                               company:update                              	*/
	/* -------------------------------------------------------------------------- */
	//...updateOperations,
	/* -------------------------------------------------------------------------- */
	/*                               company:delete                              	*/
	/* -------------------------------------------------------------------------- */
	//...deleteOperations,
];
