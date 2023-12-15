import { INodeProperties } from "n8n-workflow";

// When the resource `person` is selected, this `operation` parameter will be shown.
export const personVerbOperations: INodeProperties[] = [
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
				routing: {
					request: {
						method: 'GET',
						url: '/v2/objects/people/records',
					},
				},
			},
		],
		default: 'get',
	},
];

const personGetOperation: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordID',
		default: 'get',
		description: 'Input the record ID',
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['get'],
			},
		},
		type: 'string',
		required: true,
	},
];
