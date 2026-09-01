module.exports = {
   help: ['setwm'],
   use: 'packname | author',
   tags: 'owner',
   run: async (m, {
      conn,
      usedPrefix,
      command,
      text,
      Func
   }) => {
      try {
         let setting = global.db.setting
         if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, 'Sticker by | @senzu-bot'), m)
         let [packname, ...author] = text.split`|`
         author = (author || []).join`|`
         setting.sk_pack = packname || ''
         setting.sk_author = author || ''
         conn.reply(m.chat, Func.texted('bold', `🚩 Sticker Watermark successfully set.`), m)
      } catch (e) {
         conn.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   owner: true
}