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

export const personFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                people:get                              		*/
	/* -------------------------------------------------------------------------- */
	...getOperations,
]
