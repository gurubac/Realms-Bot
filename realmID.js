const { Authflow } = require('prismarine-auth') 
const { RealmAPI } = require('prismarine-realms')
const userIdentifier = 'any unique identifier'
const cacheDir = './' 
const authflow = new Authflow(userIdentifier, cacheDir)

const api = RealmAPI.from(authflow, 'java') // or 'bedrock'
api.getRealms().then((res) => {
    console.log(res)
})