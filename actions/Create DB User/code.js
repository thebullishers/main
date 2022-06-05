const fetch = require('node-fetch')

exports.onExecutePostLogin = async (event, api) => {

  const { secrets, user } = event
  // 1.
  const { AUTH0_HOOK_SECRET: secret } = secrets

  // 2.
  if (event.user.app_metadata.localUserCreated) {
    return
  }

  // 3.
  const { email } = user
  const url = 'http://3c6a-37-19-223-213.ngrok.io'

  // 4.
  let request
  try {
    request = await fetch(`${url}/api/auth/hook`, {
      method: 'post',
      body: JSON.stringify({ email, secret }),
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
  }

  let response
  try {
    response = await request.json()
  } catch (error) {
    console.error(error)
  }

  console.log(response)


  // 5.
  api.user.setAppMetadata('localUserCreated', true)
}
