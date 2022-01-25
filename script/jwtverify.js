"use strict";

const jwt = require("jsonwebtoken");
const jkwsClient = require("jwks-rsa");
let client;
let messageToken = "Authorization token information is missing or invalid.";

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    var signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

function isTokenValid(token, applicationId, issuerUri) {
  return new Promise((resolve) => {
    const options = {
      audience: [applicationId],
      issuer: [issuerUri],
    };
    jwt.verify(token, getKey, options, (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          messageToken = "Token Expired! " + err.message;
        }
        console.error("Jwt Validation Failed", err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = class {
  b2cissuer;
  b2capplicationId;

  constructor(issuer, applicationId, jwksUri) {
    this.b2cissuer = issuer;
    this.b2capplicationId = applicationId;
    client = jkwsClient({
      jwksUri,
    });
  }

  async jwt_verify(context, req) {
    try {
      if (req.headers.authorization != undefined) {
        const bearerToken = req.headers.authorization.replace("Bearer ", "");
        const validToken = await isTokenValid(
          bearerToken,
          this.b2capplicationId,
          this.b2cissuer
        );
        if (!validToken) {
          return {
            status: 401,
            body: { message: messageToken },
          };
        }
      } else {
        return {
          status: 400,
          body: { message: "Authorization header not found." },
        };
      }
      return {
        status: 200,
      };
    } catch (error) {
      context.log(JSON.stringify(error, null, 2));
      return {
        status: error.name === "TokenExpiredError" ? 401 : 500,
        body: { message: error.message },
      };
    }
  }
};
