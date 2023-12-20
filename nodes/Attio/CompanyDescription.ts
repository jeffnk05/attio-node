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
