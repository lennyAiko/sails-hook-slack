/**
 * Slack hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
const { IncomingWebhook } = require('@slack/webhook')
module.exports = function defineSlackHook(sails) {
  return {
    /**
     * Runs when a Sails app loads/lifts.
     */
    defaults: {
      webhookUrl: process.env.SLACK_WEBHOOK_URL,
      defaultUsername: process.env.SLACK_DEFAULT_USERNAME || 'Sails Logs',
      defaultIcon: process.env.SLACK_DEFAULT_ICON || ':boom:',
      logLevels: process.env.SLACK_LOG_LEVELS || 'error, warn, debug'
    },
    initialize: async function () {
      sails.after('hook:logger:loaded', () => {
        const webhook = new IncomingWebhook(sails.config.slack.webhookUrl)

        logLevels = sails.config.slack.logLevels.split(',')

        const originalLogger = sails.log

        sails.log = function (level, message) {
          if (logLevels.includes(level)) {
            originalLogger(level, message)
            webhook.send({
              text: `[${level.toUpperCase()}] ${message}`,
              username: sails.config.slack.defaultUsername,
              icon_emoji: sails.config.slack.defaultIcon
            })
          }
        }
      })
    }
  }
}
