# Install ionic and cordova from npm install, this is used in running the app.
$ sudo npm install -g ionic cordova

# Then add the platforms you want to target
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
$ ionic run # Run the app on an attached device
$ ionic serve # Run the app in a local web browser

# Adding paypal support
Download the paypal sdk from somewhere like:
    https://github.com/paypal/PayPal-Android-SDK
    https://github.com/paypal/PayPal-iOS-SDK

For android (not sure about ios), put the Paypal jar into platforms/android/libs/ 

