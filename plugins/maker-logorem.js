import fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
   let response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Parameter'
  m.reply('Proses...')
  let res = `https://caliphapi.com/api/rem?text=${response}&text2=ThiPAkps&apikey=ThiPAkps`
  conn.sendFile(m.chat, res, 'kaneki.jpg', `Sudah Jadi`, m, false)
}
handler.help = ['logorem'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(logorem)$/i

export default handler