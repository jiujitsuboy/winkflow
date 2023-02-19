const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,
});

const getKey = async() =>{
  const kid ="qUuLIxEZ-BqGzbYxo4KR4"
  const keys = await client.getSigningKey(kid);  
  return keys.getPublicKey()
}

const isTokenValid = async (token) =>{
  let isValid = false  

  if (token) {
    const publicKey = await getKey()
    console.log(publicKey)
    const decodeToken = jwt.verify(token, publicKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH_DOMAIN}/`,
        algorithms: ["RS256"],
      }
    );
    if(decodeToken){
      isValid = true
    }    
  }

  if(!isValid){
    throw new Error("User not authenticated.");
  }
}

// const validations = (token)=>{
//   await isTokenValid(req.token)
// }

module.exports = { isTokenValid }
