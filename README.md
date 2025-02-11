# Slack SDK for Sails

A Sails hook for to easily setup up a connection between Sails and Slack via the slack webhook.

## Installation

```bash
npm install sails-hook-slack
```

## Usage

To use the Slack hook in your Sails.js application, add the following configuration to your `config/slack.js` file:

```javascript
module.exports.slack = {
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
  defaultUsername: process.env.SLACK_DEFAULT_USERNAME || 'Sails Logs',
  defaultIcon: process.env.SLACK_DEFAULT_ICON || ':boom:',
  logLevels: process.env.SLACK_LOG_LEVELS || 'error'
}
```

## Configuration

- `webhookUrl`: Your Slack Webhook Url.
- `defaultUsername`: The default username for sails to use when sending the message to Slack.
- `defaultIcon`: The default icon for sails to use when sending the message to Slack.
- `logLevels`: A comma separated list of log levels to send to Slack.

## License

This project is licensed under the MIT License.
