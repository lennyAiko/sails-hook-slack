# Slack SDK for Sails

A Sails hook for to easily setup up a connection between Sails and Slack via the slack webhook.

## Installation

```bash
npm install sails-hook-slack
```

## Usage

To use the Slack hook in your Sails.js application, add the following configuration to your `config/slack.js` file:

```javascript
require('dotenv').config()
module.exports.slack = {
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
  defaultUsername: process.env.SLACK_DEFAULT_USERNAME,
  defaultIcon: process.env.SLACK_DEFAULT_ICON,
  logLevels: process.env.SLACK_LOG_LEVELS
}
```

## Configuration

- `webhookUrl`: Your Slack Webhook Url.
- `defaultUsername`: The default username for sails to use when sending the message to Slack.
- `defaultIcon`: The default icon for sails to use when sending the message to Slack.
- `logLevels`: A comma separated list of log levels to send to Slack.

## Bonus

There is a helper function `sails.helpers.slack` that you can use to send messages to Slack directly without logging the message.

```javascript
sails.helpers.slack('Hello from Sails!', {
  username: 'Sails',
  icon: ':boom:'
})
```

The `username` and `icon` options are optional. If not passed then the default values will be used.

## License

This project is licensed under the MIT License.
