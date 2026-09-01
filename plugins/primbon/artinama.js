module.exports = {
   help: ['artinama'],
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
         const json = await Api.get('/primbon/artinama', { q: text })
         if (!json.status) throw Func.jsonFormat(json)
         m.reply(`◦ *Nama* : ${text}\n◦ *Arti* : ${json.data.arti}\n◦ *Catatan* : ${json.data.catatan}`)
      } catch (e) {
         throw Func.jsonFormat(e)
      }
   },
   limit: true,
   error: true
}