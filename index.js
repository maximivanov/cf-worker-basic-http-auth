/**
 * @param {string} USERNAME User name to access the page
 * @param {string} PASSWORD Password to access the page
 * @param {string} PASSWORD A name of an area (a page or a group of pages) to protect.
 * Some browsers may show "Enter user name and password to access REALM"
 */
const USERNAME = 'demouser'
const PASSWORD = 'demopassword'
const REALM = 'Secure Area'

/**
 * Break down base64 encoded authorization string into plain-text username and password
 * @param {string} authorization
 * @returns {string[]}
 */
function parseCredentials(authorization) {
  const parts = authorization.split(' ')
  const plainAuth = atob(parts[1])
  const credentials = plainAuth.split(':')

  return credentials
}

/**
 * Helper funtion to generate Response object
 * @param {string} message
 * @returns {Response}
 */
function getUnauthorizedResponse(message) {
  let response = new Response(message, {
    status: 401,
  })

  response.headers.set('WWW-Authenticate', `Basic realm="${REALM}"`)

  return response
}

/**
 * @param {Request} request
 * @returns {Response}
 */
async function handleRequest(request) {
  const authorization = request.headers.get('authorization')

  if (!request.headers.has('authorization')) {
    return getUnauthorizedResponse(
      'Provide User Name and Password to access this page.',
    )
  }

  const credentials = parseCredentials(authorization)

  if (credentials[0] !== USERNAME || credentials[1] !== PASSWORD) {
    return getUnauthorizedResponse(
      'The User Name and Password combination you have entered is invalid.',
    )
  }

  return await fetch(request)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
