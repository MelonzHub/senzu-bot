const util = require('util')
const dns = require('dns').promises
const net = require('net')

function isPrivateIP(ip) {
   if (net.isIPv4(ip)) {
      const [a, b] = ip.split('.').map(Number)
      return a === 10 || a === 127 || a === 0 ||
         (a === 169 && b === 254) ||
         (a === 172 && b >= 16 && b <= 31) ||
         (a === 192 && b === 168)
   }
   return ip === '::1' || /^fe80:/i.test(ip) || /^f[cd]/i.test(ip)
}

module.exports = {
   help: ['fetch'],
   aliases: ['get'],
   use: 'url',
   tags: 'tools',
   run: async (m, {
      conn,
      usedPrefix,
      command,
      text,
      Func
   }) => {
      if (!/^https?:\/\//.test(text)) throw Func.example(usedPrefix, command, 'https://google.com')

      const { hostname } = new URL(text)
      const { address } = await dns.lookup(hostname)
      if (isPrivateIP(address)) throw 'This URL is not allowed.'

      const res = await fetch(text)
      const length = Number(res.headers.get('content-length') || 0)
      if (length > 100 * 1024 * 1024) throw `Content is too large: ${length} bytes`

      const type = res.headers.get('content-type') || ''

      if (!/text|json/.test(type)) return conn.sendFile(m.chat, text, '', text, m)
      let txt
      const raw = await res.text()

      try {
         txt = util.format(JSON.parse(raw))
      } catch {
         txt = raw
      }

      m.reply(txt.slice(0, 65536))
   },
   limit: true
}