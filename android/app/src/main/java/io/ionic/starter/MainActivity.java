package io.ionic.starter;

import android.os.Bundle;
import android.util.Log;

import com.amplifyframework.AmplifyException;
import com.amplifyframework.auth.AuthProvider;
import com.amplifyframework.auth.cognito.AWSCognitoAuthPlugin;
import com.amplifyframework.core.Amplify;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});

    try {
      Amplify.addPlugin(new AWSCognitoAuthPlugin());
      Amplify.configure(getApplicationContext());
      Log.i("MyAmplifyApp", "Initialized Amplify");
    } catch (AmplifyException error) {
      Log.e("MyAmplifyApp", "Could not initialize Amplify", error);
    }

//    Amplify.Auth.signInWithSocialWebUI(
//      AuthProvider.facebook(),
//      this,
//      result -> Log.i("AuthQuickstart", result.toString()),
//      error -> Log.e("AuthQuickstart", error.toString())
//    );
  }
}
