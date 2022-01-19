const axios = await import("lib/axios.min.js");

// クッキーを連想配列に格納
function get_cookie_array() {
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
function decode_jwt(token) {
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

  // return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
  return Buffer.from(
    String.fromCharCode.apply(null, new Uint8Array(a)),
    "utf-8"
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// pkce callenge生成
async function pkce_challenge_from_verifier(v) {
  const hashed = await sha256(v);
  const base64encoded = base64urlencode(hashed);
  return base64encoded;
}

export default class {
  login_url;
  authorize_url;
  client_id;
  redirect_url;
  scope;
  host;
  token_url;
  code_verifier_max_age = "60";

  // tokenからuserid取り出し
  user_id() {
    const cookieArray = this.get_cookie_array();
    return decode_jwt(cookieArray["id.token"]).emails[0];
  }

  // refresh_tokenを取得する
  refresh_token() {
    const cookieArray = get_cookie_array();

    if (cookieArray["refresh.token"]) {
      return cookieArray["refresh.token"];
    } else {
      // リフレッシュトークンがないとき
      return false;
    }
  }

  // id_tokenを取得する
  async id_token() {
    const cookieArray = get_cookie_array();

    if (cookieArray["id.token"]) {
      return cookieArray["id.token"];
    }
    if (cookieArray["refresh.token"]) {
      return await this.get_id_token(cookieArray["refresh.token"]);
    } else {
      // リフレッシュトークンがないとき
      return false;
    }
  }

  // id_tokenをリフレッシュする
  async get_id_token(refreshToken) {
    let postData = "grant_type=refresh_token";
    postData += "&client_id=";
    postData += this.client_id;
    postData += "&scope=openid";
    postData += "&refresh_token=";
    postData += refreshToken;

    const headers = {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        host: this.host,
      },
    };

    const res = await axios
      .post(this.token_url, postData, headers)
      .catch((err) => {
        return false;
      });

    if (res.status === 200) {
      document.cookie =
        "refresh.token = " +
        res.data.refresh_token +
        "; Max-Age=" +
        res.data.refresh_token_expires_in +
        "; Path=/" +
        ";";
      document.cookie =
        "id.token = " +
        res.data.id_token +
        "; Max-Age=" +
        res.data.id_token_expires_in +
        "; Path=/" +
        ";";
      return res.data.id_token;
    } else {
      return false;
    }
  }

  // id_tokenを取得してconfigを設定
  config() {
    const idToken = this.id_token();
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
    const codeVerifier = await pkce_challenge_from_verifier(rnd);

    document.cookie =
      "code.verifier=" +
      codeVerifier +
      "; Max-Age=" +
      this.code_verifier_max_age +
      "; Path=/" +
      ";";

    const codeChallenge = await pkce_challenge_from_verifier(codeVerifier);

    return codeChallenge;
  }
}
