import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { personFields, personOperations } from './PersonDescription';
import { companyFields, companyOperations } from './CompanyDescription';

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
			names: 'Attio',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'attioApi',
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
					{
						name: 'Company',
						value: 'company'
					}
				],
				default: 'person',
			},
			...personOperations,
			...personFields,
			...companyOperations,
			...companyFields,
		],
	};
}
