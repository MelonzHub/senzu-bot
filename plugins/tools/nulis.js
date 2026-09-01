module.exports = {
   help: ['nulis'],
   aliases: ['magernulis'],
   use: 'text',
   tags: 'tools',
   run: async (m, {
      conn,
      usedPrefix,
      command,
      text,
      Scraper,
      Func
   }) => {
      try {
         if (!text) throw Func.example(usedPrefix, command, 'senzu-bot')
         conn.sendReact(m.chat, '🕒', m.key)
         const json = await Api.get('/canvas/writing', {
            text
         })
         if (!json.status) throw Func.jsonFormat(json)
         conn.sendFile(m.chat, json.data.url, '', ``, m)
      } catch (e) {
         throw Func.jsonFormat(e)
      }
   },
   limit: true,
}