var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder()

let twilio = require('twilio')
let accountSid = process.env.TWILIO_ACCOUNT_SID
let authToken = process.env.TWILIO_AUTH_TOKEN

module.exports = api

api.post('/api/record', async function (request) {
  const recordingUrl = request.post.RecordingUrl
  const callSid = request.post.CallSid
  const recordingDuration = request.post.RecordingDuration
  let client = new twilio(accountSid, authToken)
  let call = await client.calls(callSid).fetch()

  await client.messages.create({
    to: call.from,
    from: call.to,
    body: `Your recording is complete: ${recordingUrl}`
  })
})
