/**
 * Slack hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
const { IncomingWebhook } = require('@slack/webhook')

/**
 * Runs when a Sails app loads/lifts.
 * @param {Sails} sails - The sails framework
 */
module.exports = function defineSlackHook(sails) {
  return {
    /**
     * Default config values for this hook
     */
    defaults: {
      /**
       * The web hook URL for slack
       */
      webhookUrl: process.env.SLACK_WEBHOOK_URL,
      /**
       * The default username for the slack message
       */
      defaultUsername: process.env.SLACK_DEFAULT_USERNAME || 'Sails Logs',
      /**
       * The default icon for the slack message
       */
      defaultIcon: process.env.SLACK_DEFAULT_ICON || ':boom:',
      /**
       * The log levels that should be sent to slack
       */
      logLevels: process.env.SLACK_LOG_LEVELS || 'error, warn, debug'
    },

    /**
     * Initializes the hook.
     */
    initialize: async function () {
      sails.after('hook:logger:loaded', () => {
        const webhook = new IncomingWebhook(sails.config.slack.webhookUrl)

        const logLevels = sails.config.slack.logLevels.split(',')

        const originalLogger = sails.log

        /**
         * Override the logger to send messages to slack
         * @param {string} level - The log level
         * @param {string} message - The log message
         */
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
