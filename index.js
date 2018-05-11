var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder()

let twilio = require('twilio')
let accountSid = process.env.TWILIO_ACCOUNT_SID
let authToken = process.env.TWILIO_AUTH_TOKEN

module.exports = api

api.post('/api/record', async function (request) {
  console.log('process.env', process.env)
  console.log('request.body', request.body)
  const recordingUrl = request.post.RecordingUrl
  const callSid = request.post.CallSid
  const recordingDuration = request.post.RecordingDuration
  console.log({accountSid, authToken})
  let client = new twilio(accountSid, authToken)
  let call = await client.calls(callSid).fetch()

  // store the call and send the user to the call page

  await client.messages.create({
    to: call.from,
    from: call.to,
    body: `Your recording is complete: ${recordingUrl}`
  })
})


api.get('/api/recordings/:id', async function (request) {
  // if queryString param download = true, and the record has a payment ID, then redirect to recording
})



api.post('/api/recording_paid', async function (request) {
  // validate the payment with stripe
})

/*
 * table: recordings
 * columns: -
 *   url:
 *   from_phone:
 *   to_phone:
 *   duration:
 *   date:
 *   twilio_sid:
 *   stripe_payment_id:
*/

