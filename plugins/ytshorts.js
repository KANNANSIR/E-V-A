let fetch = require('node-fetch')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `uhm.. where is the url?\n\nExample:\n${usedPrefix + command} https://youtube.com/shorts/`
  if (!args[0].match(/shorts/gi)) throw `wrong url`
  
  let res = await fetch(global.API('fxc7', '/api/download/ytshort', { url: args[0] }, 'apikey'))
  if (!res.ok) throw eror
  let json = await res.json()
  if(!json.data[0]) throw json
  let { title, channel, thumb, views,  } = json.data[0]
let ytshorts = `✨️ *Title:* ${title}
 *Channel:* ${channel}
 *Quality*: ${quality}
 *Direct URL:* ${views}\n\n@Eva`

  await conn.sendFile(m.chat, thumb, '', ytshorts, m)
  await conn.sendFile(m.chat, link, '', ytshorts, m)
}
handler.help = ['ytshorts'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ytshorts)$/i
handler.limit = true
module.exports = handler