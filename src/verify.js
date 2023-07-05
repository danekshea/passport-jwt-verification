const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const axios = require("axios");

async function verifyToken() {
  //axios request
  const url =
    "https://auth.immutable.com/.well-known/jwks.json?_gl=1*1g7a0qs*_ga*NDg1NTg3MDI3LjE2ODU1OTY1Mzg.*_ga_4JBHZ7F06X*MTY4ODUyNjkyNy4xNC4wLjE2ODg1MjY5MjcuMC4wLjA.*_ga_7XM4Y7T8YC*MTY4ODUyNjkyNy4yNy4wLjE2ODg1MjY5MjcuMC4wLjA.";

  const getJWKS = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const jwks = await getJWKS();

  // Select the key you want to use, likely you'll want the first one
  const jwk = jwks.keys[0];

  // Convert the JWK to a PEM
  const pem = jwkToPem(jwk);

  const IDtoken =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNhYVl5dGR3d2UwMzJzMXIzVElyOSJ9.eyJkZXZlbG9wZXJfaHViIjp7InVzZXJNZXRhZGF0YSI6e319LCJwYXNzcG9ydCI6eyJldGhlcl9rZXkiOiIweGEwZDMwNWRkZTJiMGQ0NzU4NTQ2MGFkOWJkN2FlZjNiODYwMzYxNDEiLCJpbXhfZXRoX2FkZHJlc3MiOiIweGEwZDMwNWRkZTJiMGQ0NzU4NTQ2MGFkOWJkN2FlZjNiODYwMzYxNDEiLCJpbXhfc3RhcmtfYWRkcmVzcyI6IjB4MDYwMmNlOTM3MjdhYmRmNTUyNWNlYjk2Y2UxNDNjYmQzNWM4ZjE5ZWVkNWM5YzZkNWUxNGI0MTYxZTI5ODI4MyIsImlteF91c2VyX2FkbWluX2FkZHJlc3MiOiIweDdjMzM5MDUxYWI0ZjA1ODg1NmI2ZTMyMzYwYThjZjlmNzBlODgzOTkiLCJzdGFya19rZXkiOiIweDA2MDJjZTkzNzI3YWJkZjU1MjVjZWI5NmNlMTQzY2JkMzVjOGYxOWVlZDVjOWM2ZDVlMTRiNDE2MWUyOTgyODMiLCJ1c2VyX2FkbWluX2tleSI6IjB4N2MzMzkwNTFhYjRmMDU4ODU2YjZlMzIzNjBhOGNmOWY3MGU4ODM5OSJ9LCJlbWFpbCI6ImRhbmVrc2hlYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmltbXV0YWJsZS5jb20vIiwiYXVkIjoidnA3aVdmZ2dXeUlaZTRCdlFqazNTSENFU2R0bG1FT2siLCJpYXQiOjE2ODg1Mjg2NDgsImV4cCI6MTY4ODU2NDY0OCwic3ViIjoiZW1haWx8NjQ3N2YyNmFhNzE1YzljNTQ0YjQyZGJlIn0.Z0QaKXELEUSfLqx5S1YwFQGWi_JjfLSYFwL0vD_k5KMYqLAi-_R4UTzXNrZZTHhhPLFiT8jxFph4NcA7kySWpGTwMSxslicF4KyxuiN6-zvwI9TMC-vtHQs1teTikzzV4f4Zs6vltXb9HfOfcC3UuSO1npr1wPASZozlCfz0JFgwwJIJwYnMctZW_oC3Vbgf_fNMyt6mRYd3s_a5zSjEWXCwS-1bQx4K6tmbHlCzhGDOKT4o_kfzkI6MzynAwWAHbSjx4mzMS59iqamcpTk-oH5b6f8HDXl49W5lEga_3nCCZ7g8ZS_6Prn67k3gYXj5Irb7s5RsUBf-XqaTl0ufpA";

  jwt.verify(IDtoken, pem, { algorithms: ["RS256"] }, (err, decoded) => {
    if (err) {
      console.log("JWT verification failed:", err);
      return;
    }
    console.log("JWT verified:", decoded);
  });
}

verifyToken();