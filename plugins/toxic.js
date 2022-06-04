let handler = async (m) => m.reply(`
${['jan toxic lah bng 🗿',
 'ketikan nya dijaga ya beb 🗿',
 'sekali lgi toxic, gw entod lu 🗿',
 'dimohon utk tidak toxic 🗿🙏'].getRandom()}
  `.trim(), null, m.mentionedJid ? {
  mentions: m.mentionedJid
} : {})

handler.customPrefix = /ajg|anjg|anjing|babi|bgst|bngst|bangsat|ngentot|kontol|kntol|kntl|memek|memeq|mmek|mmk|jancok|jncok|jnck|pantek|pntk|pntek|goblok|gblok|gblk|pepek|bangke|tolol/i
handler.command = new RegExp

export default handler
