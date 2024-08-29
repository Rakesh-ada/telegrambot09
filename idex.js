const moment = require('moment');
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');

// Replace with your Telegram bot token
const token = '6551464352:AAG-7lxd9HIIKeGezY8EzyvWc4Zu_QxJHAc';

// Replace with your Telegram chat ID
const chatId = '5799697697';

// Create a bot instance
const bot = new TelegramBot(token, { polling: false }); // No need for polling if not using commands

// Define the full weekly schedule
const weeklySchedule = {
    0: [ // Sunday
      
    ],
    1: [ // Monday
        { subject: 'LAB/MEC1052/SK/MK/CME118', time: '9:00 AM' },
        { subject: 'L/MTH1101/AP/CB501', time: '2:00 PM' },
        { subject: 'REMEDIAL/CB501', time: '3:00 PM' },
    ],
    2: [ // Tuesday
        { subject: 'L/PHY1001/RC/CB512', time: '9:00 AM' },
        { subject: 'L/ECE1001/TD/CB512', time: '10:OO AM' },
        { subject: 'L/PHY1001/DM/CB512', time: '11:00 AM' },
        { subject: 'LAB/ECE1051/TD/PM+MS/ICT401', time: '1:00 PM' },
        { subject: 'LAB/PHY1051/RC/CB106A', time: '3:00 PM' }
    ],
    3: [ // Wednesday
        { subject: 'L/MTH1101/SDS/CB501', time: '9:00 AM' },
        { subject: 'L/PHY1001/RC/CB501', time: '10:00 AM' },
        { subject: 'L/ECE1001/TD/CB501', time: '11:00 AM' },
        { subject: 'LAB/MEC1051/SH/RK,SC/CMEB06', time: '1:00 PM' },
    ],
    4: [ // Thursday
        { subject: 'L/MTH1101/SDS/CB5O1', time: '9:00 AM' },
        { subject: 'L/ECE1001/TD/CB501', time: '10:00 AM' },
        { subject: 'T1/HUM1002/SC/ICT306', time: '11:00 AM' },
        { subject: 'L/PHY1001/DM/CB512', time: '1:00 PM' },
        { subject: 'T1/MTH1101/AP/CB512', time: '2:00 PM' },
    ],
    5: [ // Friday
        { subject: 'L/HUM1002/KM/CB512', time: '9:00 AM' },
        { subject: 'T1/MEC1052/AM/CB512', time: '10:00 AM' },
        { subject: 'T1/MEC1051/PG/CB512', time: '11:00 AM' },
        { subject: 'L/HUM1002/SC/CB512', time: '1:00 PM' },
        { subject: 'L/LIFE SKILL/BB/CB512', time: '2:00 PM' },
    ],
    6: [ // Saturday
      
    ],
};

// Schedule notifications for each class in the weekly schedule
Object.keys(weeklySchedule).forEach(dayOfWeek => {
    weeklySchedule[dayOfWeek].forEach(classInfo => {
        const classTime = moment(classInfo.time, 'h:mm A');
        const notificationTime = classTime.subtract(10, 'minutes');

        // Schedule the notification with Kolkata timezone
        cron.schedule(`${notificationTime.minutes()} ${notificationTime.hours()} * * ${dayOfWeek}`, () => {
          bot.sendMessage(chatId, `🔔 Reminder: Your ${classInfo.subject} class is about to start at ${classInfo.time}.`);
      }, {
          timezone: "Asia/Kolkata"
      });
  });
});

console.log("Bot is running and will send notifications based on the predefined weekly schedule with Kolkata timezone.");
