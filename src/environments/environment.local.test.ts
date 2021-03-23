export const environment = {
  apiServer: 'http://localhost:3030',
  production: false,
  test: true,
  googleApiKey: 'AIzaSyCz0FQatyreasOI76Z0F5aR8QsL3qPJ8Jc',
  S3BucketUrlForPackages:
    'https://voyaah-package-images-test.s3.ap-south-1.amazonaws.com/public/',
  S3BucketUrlForPackagesAboutPage:
    'https://voyaah-package-images-test.s3.ap-south-1.amazonaws.com',
  aws_identity_pool_id: 'ap-south-1:1f036cea-6b5c-4e0f-b819-b6d04583a295',
  bucket: 'voyaah-package-images-test',
  region: 'ap-south-1',
  auth: {
    identityPoolId: 'ap-south-1:1f036cea-6b5c-4e0f-b819-b6d04583a295',
    region: 'ap-south-1',
    identityPoolRegion: 'ap-south-1',
    userPoolId: 'ap-south-1_5v1DCOXU0',
    userPoolWebClientId: '7cmpjjddflgq5cu38f85l8ffrt',
    oauth: {
      domain: 'voyaah-web-app.auth.ap-south-1.amazoncognito.com',
      scope: [
        'phone',
        'email',
        'profile',
        'openid',
        'aws.cognito.signin.user.admin',
      ],
      redirectSignIn: 'http://localhost:4200/',
      redirectSignOut: 'http://localhost:4200/',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
  Analytics: {
    AWSPinpoint: {
      // Amazon Pinpoint App Client ID
      appId: '6aef9ca1f8534b28a8ebbdcc8f84d8e8',
      // Amazon service region
      region: 'ap-south-1',
      mandatorySignIn: false,
    },
  },
};
