module.exports = {
   help: ['shio'],
   use: 'query',
   tags: 'primbon',
   run: async (m, {
      conn,
      usedPrefix,
      command,
      text,
      Func
   }) => {
      try {
         if (!text) throw Func.example(usedPrefix, command, 'senzu')
         conn.sendReact(m.chat, '🕒', m.key)
         const json = await Api.get('/primbon/shio', {
            q: text
         })
         if (!json.status) throw Func.jsonFormat(json)
         m.reply(json.data.result)
      } catch (e) {
         throw Func.jsonFormat(e)
      }
   },
   limit: true,
   error: true
}