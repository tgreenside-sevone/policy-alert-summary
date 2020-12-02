# policy-alert-summary

Clone the project, then within the policy-alert-summary directory, run "wdk-cli run" to run the project in your SevOne widget dev kit environment.

When you are ready to publish your widget, first pack it:

    wdk-cli pack

Then publish it to your DI system (update your file name, registry info, and tenant as require for your system:

    wdk-cli publish --skip-ssl --file .tgz --registry https://10.128.9.172/wdkserver --tenant SevOne