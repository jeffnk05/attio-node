import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { personOperations, personFields } from './PersonDescription';

export class Attio implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Attio',
		name: 'attio',
		icon: 'file:attio.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Attio API',
		defaults: {
			names: 'Attio'
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name:  'attioApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.attio.com',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Person',
						value: 'person',
					},
				],
				default: 'person'
			},
			...personOperations,
			...personFields,
		],

	};
}
