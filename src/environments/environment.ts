// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiServer: 'http://localhost:3030',
  production: false,
  test: false,
  googleApiKey: 'AIzaSyCz0FQatyreasOI76Z0F5aR8QsL3qPJ8Jc',
  S3BucketUrlForPackages:
    'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com/public/',
  S3BucketUrlForPackagesAboutPage:
    'https://voyaah-package-images-dev.s3.ap-south-1.amazonaws.com',
  aws_identity_pool_id: 'ap-south-1:1f75e46a-b52f-4f3e-b33d-d5321ab48774',
  bucket: 'voyaah-package-images-dev',
  region: 'ap-south-1',
  auth: {
    identityPoolId: 'ap-south-1:1f75e46a-b52f-4f3e-b33d-d5321ab48774',
    region: 'ap-south-1',
    identityPoolRegion: 'ap-south-1',
    userPoolId: 'ap-south-1_sSkTv4Dzi',
    userPoolWebClientId: '550sgaguhkudugb4uesu9u2vkq',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
