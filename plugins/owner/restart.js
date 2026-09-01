module.exports = {
   help: ['restart'],
   tags: 'owner',
   run: async (m, {
      conn,
      database,
      Func
   }) => {
      await conn.reply(m.chat, Func.texted('bold', 'Restarting . . .'), m).then(async () => {
         await database.save(global.db)
         await Func.delay(1500)
         process.send('reset')
      })
   },
   owner: true
}