import { CognitoUser } from 'amazon-cognito-identity-js';

export class User {
  username: string;
  cognitoUser?: CognitoUser;
}
