export const environment = {
  apiServer: 'https://www.voyaah.com',
  production: true,
  test: false,
  googleApiKey: 'AIzaSyAmQ9DoN7d0YpC_O6Bw4mwctBxCncCjDNo',
  //production -- Google API Key..
  S3BucketUrlForPackages:
    'https://voyaah-package-images-prod.s3.ap-south-1.amazonaws.com/public/',
  S3BucketUrlForPackagesAboutPage:
    'https://voyaah-package-images-prod.s3.ap-south-1.amazonaws.com',
  aws_identity_pool_id: 'ap-south-1:b2cce421-d9de-4766-ab78-d1c367d389dd',
  bucket: 'voyaah-package-images-prod',
  region: 'ap-south-1',
  auth: {
    identityPoolId: 'ap-south-1:b2cce421-d9de-4766-ab78-d1c367d389dd',
    region: 'ap-south-1',
    identityPoolRegion: 'ap-south-1',
    userPoolId: 'ap-south-1_7A2VVuNJu',
    userPoolWebClientId: '4g3t1fej2soscadlrtq9v89dor',
    oauth: {
      domain: 'voyaah-web-app-prod.auth.ap-south-1.amazoncognito.com',
      scope: [
        'phone',
        'email',
        'profile',
        'openid',
        'aws.cognito.signin.user.admin',
      ],
      redirectSignIn: 'https://www.voyaah.com/',
      redirectSignOut: 'https://www.voyaah.com/',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
  Analytics: {
    AWSPinpoint: {
      // Amazon Pinpoint App Client ID
      appId: 'b86380349aab4fdba68fb94bf64bee55',
      // Amazon service region
      region: 'ap-south-1',
      mandatorySignIn: false,
    },
  },
};
