const fetch = require('node-fetch')

exports.onExecutePostLogin = async (event, api) => {
  // 1.  
  const SECRET = event.secrets.AUTH0_HOOK_SECRET
  
  // 2.
  if (event.user.app_metadata.localUserCreated) {
    return
  }

  // 3.
  const email = event.user.email

  const url = 'NGROK_URL_REPLACE_HERE'
  // 4.
  const request = await fetch(url+'/api/auth/hook', { 
    method: 'post',
    body: JSON.stringify({ email, secret: SECRET }),
    headers: { 'Content-Type': 'application/json' },
  })
  const response = await request.json()

  // 5.
  api.user.setAppMetadata('localUserCreated', true)
}