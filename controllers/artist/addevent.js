const { google } = require('googleapis')
const { OAuth2 } = google.auth
const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
)
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_CALENDER_REFRESH_TOKEN,
})
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
exports.addEventToGoogleCalender = async (
  summary,
  startTime,
  endTime,
  location,
  description,
  colorId,
  attendees
) => {
  try {
    var event = {
      summary: summary,
      location: location,
      description: description,
      colorId: colorId,
      start: {
        dateTime: startTime,
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endTime,
        timeZone: 'Asia/Kolkata',
      },
      attendees: attendees,
      conferenceDataVersion: 1,
      conferenceData: {
        createRequest: {
          requestId: 'Sample123',
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 30 },
          { method: 'popup', minutes: 10 },
        ],
      },
    }
    const eventData = await calendar.events.insert({
      auth: oAuth2Client,
      calendarId: 'primary',
      resource: event,
    })
    console.log('DATA', eventData)
    if (!eventData) return null
    const eventPatch = {
      conferenceData: {
        createRequest: { requestId: 'Sample123' },
      },
    }
    let response = await calendar.events.patch({
      calendarId: 'primary',
      eventId: eventData.data.id,
      resource: eventPatch,
      sendNotifications: true,
      conferenceDataVersion: 1,
    })
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}
exports.deleteEventFromGoogleCalender = (eventId) => {
  try {
    var params = {
      calendarId: 'primary',
      eventId: eventId,
    }
    calendar.events.delete(params, function (err) {
      if (err) {
        console.log('The API returned an error: ' + err)
        return null
      }
      return {}
    })
  } catch (error) {
    console.log(error)
  }
}