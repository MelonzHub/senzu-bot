module.exports = {
   help: ['owner'],
   aliases: ['creator'],
   tags: 'miscs',
   run: async (m, {
      conn,
      env
   }) => {
      conn.sendContact(m.chat, [{
         name: env.owner_name,
         number: env.owner,
         about: 'Owner & Creator'
      }], m, {
         org: 'Senzu Support',
         website: 'https://guns.lol/melonzvelia',
         email: 'memeldev039@gmail.com'
      })
   }
}