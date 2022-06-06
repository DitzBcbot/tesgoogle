let handler = async (m, { conn, text }) => {
    let yh = global.ragil
    let url = yh[Math.floor(Math.random() * yh.length)]
    conn.sendButton(m.chat, 'Ada apa manggil manggil saya 🤖', 'ʙᴀɴᴛᴜ ʀᴀᴍᴇɪɴ ɢᴄ :\nhttps://chat.whatsapp.com/Dxtz9xAxial3A43AJetabY\nhttps://chat.whatsapp.com/Dxtz9xAxial3A43AJetabY\nhttps://chat.whatsapp.com/Dxtz9xAxial3A43AJetabY ', url, [['MENU', '#menu']], m)
  }
  handler.customPrefix = /ragil/i
handler.command = new RegExp
  export default handler
  
  global.ragil = [
"https://telegra.ph/file/06420b025bb7b91de9d2e.jpg",
"https://telegra.ph/file/06420b025bb7b91de9d2e.jpg" 
  ]