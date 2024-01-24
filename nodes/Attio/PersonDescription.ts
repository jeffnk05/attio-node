import { INodeProperties } from 'n8n-workflow';

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
						url: '=/v2/objects/people/records',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a person record',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v2/objects/people/records',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a person record'
			},
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
		displayName: 'Email Address',
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
];

const updateOperations: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['update'],
			},
		},
		routing: {
			request: {
				method: 'PATCH',
				url: '=/v2/objects/people/records/{{encodeURIComponent($value)}}',
			},
		},
	},
	{
		displayName: 'Email Address',
		name: 'emailAddress',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['update'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'data.values.email_addresses[0].email_address',
			},
		},
	},
];

const deleteOperations: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordID',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['delete'],
			},
		},
		routing: {
			request: {
				method: 'DELETE',
				url: '=/v2/objects/people/records/{{encodeURIComponent($value)}}',
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

export const personFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                people:get                              		*/
	/* -------------------------------------------------------------------------- */
	...getOperations,
	/* -------------------------------------------------------------------------- */
	/*                                people:create                              */
	/* -------------------------------------------------------------------------- */
	...createOperations,
	/* -------------------------------------------------------------------------- */
	/*                                people:update                              	*/
	/* -------------------------------------------------------------------------- */
	...updateOperations,
	/* -------------------------------------------------------------------------- */
	/*                                people:delete                              	*/
	/* -------------------------------------------------------------------------- */
	...deleteOperations,
];
