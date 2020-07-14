
const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'rrruchi56@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`
  })
}
const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'rrruchi56@gmail.com',
    subject: 'Sorry to say you go!',
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}