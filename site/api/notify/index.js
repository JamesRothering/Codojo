// Azure Function: api/notify
// Triggered by POST /api/notify from assess/index.html
// 
// To activate: 
//   1. In Azure Portal, create a Function App linked to your Static Web App
//   2. Set environment variable SENDGRID_API_KEY (or swap for your preferred provider)
//   3. Deploy with: func azure functionapp publish <your-app-name>
//
// This stub logs and returns 200 so the UI works immediately on deploy.
// Replace the TODO section with your real email/storage logic.

module.exports = async function (context, req) {
  const email = (req.body && req.body.email) || '';

  if (!email || !email.includes('@')) {
    context.res = { status: 400, body: { error: 'Invalid email' } };
    return;
  }

  // TODO: Replace with one of:
  //   A) SendGrid: POST to https://api.sendgrid.com/v3/contactdb/recipients
  //   B) Azure Table Storage: write row to a "notify" table
  //   C) Simple forward: send yourself an email via nodemailer + SMTP

  context.log(`Notify signup: ${email}`);

  // For now: just acknowledge. Wire up real storage/email here.
  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { ok: true, message: 'Noted.' }
  };
};
