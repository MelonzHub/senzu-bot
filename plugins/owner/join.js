module.exports = {
   help: ['join'],
   use: 'group link',
   tags: 'owner',
   run: async (m, {
      conn,
      usedPrefix,
      command,
      args,
      Func
   }) => {
      try {
         if (!args || !args[0]) return conn.reply(m.chat, Func.example(usedPrefix, command, 'https://chat.whatsapp.com/codeInvite 1d'), m)

         let link = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
         let [_, code] = args[0].match(link) || []
         if (!code) return conn.reply(m.chat, global.status.invalid, m)

         let id = await conn.groupAcceptInvite(code)
         if (!id.endsWith('g.us')) return conn.reply(m.chat, Func.texted('bold', `🚩 Sorry i can't join to this group :(`), m)

         let groupMeta = await conn.groupMetadata(id)
         let group = global.db.groups[id] || {}
         let option = args[1] ? args[1].toLowerCase() : null

         if (option && !groupMeta?.membershipApprovalMode) {
            let now = new Date() * 1
            let duration = 0

            if (/d/gi.test(option)) {
               duration = 86400000 * parseInt(option.replace('d', ''))
            } else if (/h/gi.test(option)) {
               duration = 3600000 * parseInt(option.replace('h', ''))
            } else if (/m/gi.test(option)) {
               duration = 60000 * parseInt(option.replace('m', ''))
            }

            if (duration > 0) {
               group.expired = now + duration
               group.stay = false
               global.db.groups[id] = group
               await conn.reply(m.chat, Func.texted('bold', `🚩 Joined! Bot will stay for ${option.replace(/d|h|m/, v => v == 'd' ? ' day' : v == 'h' ? ' hour' : ' minute')}.`), m).then(async () => {
                  await Func.delay(5000)
                  conn.reply(id, `Hello👋, I am Senzu Bot. I joined this group because I was hired. I can help everyone in this group with small tasks.\n\nCountdown to the end of the rental period :\n${group.stay ? 'FOREVER' : (group.expired == 0 ? 'NOT SET' : Func.timeReverse(group.expired - new Date() * 1))}`, Func.fake(2, 'Senzu Bot WhatsApp - https://guns.lol/melonzvelia'), {
                     mentions: groupMeta.participants.map(v => v.phoneNumber)
                  })
               })
               return
            }
         }
         return conn.reply(m.chat, `🚩 Joined!`, m)
      } catch (e) {
         return conn.reply(m.chat, Func.texted('bold', `🚩 Sorry i can't join to this group :(`), m)
      }
   },
   owner: true
}