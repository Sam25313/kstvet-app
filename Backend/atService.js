require('dotenv').config();
const africastalking = require('africastalking');

const username = process.env.AT_USERNAME;
const apiKey = process.env.AT_API_KEY;

const AT = africastalking({ username, apiKey });
const sms = AT.SMS;

const sendBulkSms = async (phoneNumbers, message) => {
  try {
    const result = await sms.send({
      to: phoneNumbers,
      message: message,
      from: 'AFRICASTKNG' 
    });
    return result;
  } catch (ex) {
    console.error('Error sending SMS:', ex);
    throw new Error('Failed to send SMS using Africa\'s Talking.');
  }
};

module.exports = { sendBulkSms };