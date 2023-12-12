import {
	IAuthenticate,
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IDataObject,
	IHttpRequestHelper,
	INodeProperties,
} from 'n8n-workflow';


export class AttioApi implements ICredentialType {
	name = 'attioApi';
	displayName: 'Attio API';
	documentationUrl: 'https://github.com/jeffnk05/attio-node';
	properties: INodeProperties[] = [
		{
			displayName: 'Token',
			name: 'token',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: 'https://api.attio.com/v2',
		},
	];

}
