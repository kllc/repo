"use strict";

const DynamicsWebApi = require("dynamics-web-api");
const ConfidentialClientApplication =
  require("@azure/msal-node").ConfidentialClientApplication;

module.exports = class {
  dynamicsWebApi;

  constructor(resource, authorityUrl, applicationId, secretValue) {
    const authClient = new ConfidentialClientApplication({
      auth: {
        authority: authorityUrl,
        clientId: applicationId,
        clientSecret: secretValue,
      },
    });

    function acquireToken(dynamicsWebApiCallback) {
      authClient
        .acquireTokenByClientCredential({
          scopes: [resource + "/.default"],
        })
        .then((res) => {
          dynamicsWebApiCallback(res);
        });
    }

    this.dynamicsWebApi = new DynamicsWebApi({
      webApiUrl: resource + "/api/data/v9.1/",
      onTokenRefresh: acquireToken,
    });
  }
};
