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
  webhook: process.env.SLACK_WEBHOOK_URL
}
```

## Configuration

- `webhook`: Your Slack Webhook Url.

## License

This project is licensed under the MIT License.
