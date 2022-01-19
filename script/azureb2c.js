// クッキーを連想配列に格納
function getCookieArray() {
  const arr = [];
  if (document.cookie !== "") {
    const tmp = document.cookie.split("; ");
    for (let i = 0; i < tmp.length; i++) {
      const data = tmp[i].split("=");
      arr[data[0]] = decodeURIComponent(data[1]);
    }
  }
  return arr;
}

// tokenのdecode
function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
}

// textをsha256で返却
function sha256(plain) {
  // returns promise ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

// base64でurlencodeして返却
function base64urlencode(a) {
  // Convert the ArrayBuffer to string using Uint8 array.
  // btoa takes chars from 0-255 and base64 encodes.
  // Then convert the base64 encoded to base64url encoded.
  // (replace + with -, replace / with _, trim trailing =)

  return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// pkce callenge生成
async function pkceChallengeFromVerifier(v) {
  const hashed = await sha256(v);
  const base64encoded = base64urlencode(hashed);
  return base64encoded;
}

export class adb2cal {
  login_url;
  authorize_url;
  client_id;
  redirect_url;
  scope;
  host;
  token_url;
  code_verifier_max_age = 60;

  constructor(
    loginUrl,
    authorizeUrl,
    clientId,
    redirectUrl,
    scope,
    host,
    tokenUrl,
    codeVerifierMaxAge
  ) {
    this.login_url = loginUrl;
    this.authorize_url = authorizeUrl;
    this.client_id = clientId;
    this.redirect_url = redirectUrl;
    this.scope = scope;
    this.host = host;
    this.token_url = tokenUrl;
    if (codeVerifierMaxAge) {
      this.code_verifier_max_age = codeVerifierMaxAge;
    } else {
      this.code_verifier_max_age = 60;
    }
  }

  // tokenからuserid取り出し
  user_id() {
    const cookieArray = this.getCookieArray();
    return decodeJwt(cookieArray["id.token"]).emails[0];
  }

  // refresh_tokenを取得する
  get_refresh_token() {
    const cookieArray = getCookieArray();

    if (cookieArray["refresh.token"]) {
      return cookieArray["refresh.token"];
    } else {
      // リフレッシュトークンがないとき
      return false;
    }
  }

  // id_tokenを取得する
  async get_id_token() {
    const cookieArray = getCookieArray();

    if (cookieArray["id.token"]) {
      return cookieArray["id.token"];
    }
    if (cookieArray["refresh.token"]) {
      return await this.refresh_id_token(cookieArray["refresh.token"]);
    } else {
      // リフレッシュトークンがないとき
      return false;
    }
  }

  // id_tokenをリフレッシュする
  async refresh_id_token(refreshToken) {
    let postData = "grant_type=refresh_token";
    postData += "&client_id=";
    postData += this.client_id;
    postData += "&scope=openid";
    postData += "&refresh_token=";
    postData += refreshToken;

    return await this.get_token(postData);
  }

  // codeからtokenを取得する
  async set_token(code) {
    const cookieArray = getCookieArray();

    let postData = "grant_type=authorization_code";
    postData += "&client_id=";
    postData += this.client_id;
    postData += "&scope=openid";
    postData += "&code=";
    postData += code;
    postData += "&redirect_uri=";
    postData += this.redirect_url;
    postData += "&code_verifier=";
    postData += cookieArray["code.verifier"];

    await this.get_token(postData);
  }

  // postしてtokenを取得する
  async get_token(postData) {
    const opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postData,
    };

    const res = await fetch(this.token_url, opt);
    if (res.ok) {
      const data = await res.json();
      document.cookie =
        "refresh.token = " +
        data.refresh_token +
        "; Max-Age=" +
        data.refresh_token_expires_in +
        "; Path=/" +
        ";";
      document.cookie =
        "id.token = " +
        data.id_token +
        "; Max-Age=" +
        data.id_token_expires_in +
        "; Path=/" +
        ";";
      return data.id_token;
    } else {
      return false;
    }
  }

  // id_tokenを取得してconfigを設定
  config() {
    const idToken = this.get_id_token();
    if (idToken) {
      const config = {
        headers: {
          Authorization: "Bearer " + idToken,
        },
      };
      return config;
    } else {
      return false;
    }
  }

  // pkce_challenge を生成
  async code_challenge() {
    const rnd = Math.random().toString(32).substring(2);

    // codeVerifierはrndそのままでもいいが、変換しておく
    const codeVerifier = await pkceChallengeFromVerifier(rnd);

    document.cookie =
      "code.verifier=" +
      codeVerifier +
      "; Max-Age=" +
      this.code_verifier_max_age +
      "; Path=/" +
      ";";

    const codeChallenge = await pkceChallengeFromVerifier(codeVerifier);

    return codeChallenge;
  }
}
