import { INodeProperties } from "n8n-workflow";

// When the resource `person` is selected, this `operation` parameter will be shown.
export const personOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['person'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a person',
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a person record',
				routing: {
					request: {
						method: 'POST',
						url: '=/v2/objects/people/records'
					}
				}
			}
		],
		default: 'get',
	},
];

const getOperations: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordID',
		type: 'string',
		description: 'Input the record ID',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['get'],
			},
		},
		routing: {
			request: {
				method: 'GET',
				url: '=/v2/objects/people/records/{{encodeURIComponent($value)}}',
			},
		},
		required: true,
		default: '',
	},
];

const createOperations: INodeProperties[] = [
	{
			displayName: 'Email Adress',
			name: 'emailAddress',
			type: 'string',
			default: '',
			displayOptions: {
					show: {
							resource: ['person'],
							operation: ['create'],
					},
			},
			routing: {
					send: {
							type: 'body',
							property: 'data.values.email_addresses[0].email_address',
					},
			},
	},
	// Additional fields for last name, email, etc., following the same pattern
];


export const personFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                people:get                              		*/
	/* -------------------------------------------------------------------------- */
	...getOperations,
	/* -------------------------------------------------------------------------- */
	/*                                contact:create                              */
	/* -------------------------------------------------------------------------- */
	...createOperations,
]
