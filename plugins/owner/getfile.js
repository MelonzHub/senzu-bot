const fs = require('fs')
const path = require('path')

module.exports = {
   help: ['getfile'],
   use: 'path/to/file.js',
   tags: 'owner',
   run: async (m, {
      conn,
      usedPrefix,
      command,
      text,
      Func
   }) => {
      try {
         if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, 'plugins/menu.js'), m)
         const filePath = path.resolve(process.cwd(), text)
         if (!fs.existsSync(filePath)) return conn.reply(m.chat, `🚩 File '${text}' not found.`, m)
         if (fs.lstatSync(filePath).isDirectory()) {
            const list = fs.readdirSync(filePath).map(v => '  ' + v).join('\n')
            return conn.reply(m.chat, `📂 Directory listing for *${text}*:\n\n${list}`, m)
         }
         const content = fs.readFileSync(filePath, 'utf-8')
         if (content.length > 4000) {
            return conn.sendFile(m.chat, fs.readFileSync(filePath), path.basename(filePath), '', m)
         } else {
            return conn.metaSnippet(m.chat, {
               text: `Isi file *${text}*:`,
               code: {
                  file: filePath
               }
            }, m)
         }
      } catch (e) {
         conn.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true,
   error: false
}
