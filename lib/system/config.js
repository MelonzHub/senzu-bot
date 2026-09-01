const { Function: Func, AlyaApi } = require('@znan/wabot')
global.creator = 'Melonz Velia'
global.Api = AlyaApi(process.env.API_ENDPOINT, process.env.API_KEY)
global.header = `Senzu Bot v${require('package.json').version}`
global.footer = Func.Styles('Senzu Bot')
global.status = Object.freeze({
   wait: Func.texted('bold', 'Processing. . .'),
   invalid: Func.texted('bold', 'Invalid URL!'),
   wrong: Func.texted('bold', 'Wrong format!'),
   error: Func.texted('bold', 'Error occurred!'),
   errorF: Func.texted('bold', 'This feature is an error'),
   premium: Func.texted('bold', 'This feature is only for premium users.'),
   admin: Func.texted('bold', 'This command is specific to Admins.'),
   botAdmin: Func.texted('bold', 'Make the bot admin to use this command.'),
   owner: Func.texted('bold', 'This command is for Owner only.'),
   mod: Func.texted('bold', 'This command is for Moderators only.'),
   group: Func.texted('bold', 'This command is Group specific.'),
   private: Func.texted('bold', 'This command is private chat only.'),
   register: Func.texted('bold', 'Please register first to use this command.'),
   gameInactive: Func.texted('bold', 'The game feature has not been activated.'),
   restrict: Func.texted('bold', 'This feature is disabled')
})
Func.updateFile(require.resolve(__filename))