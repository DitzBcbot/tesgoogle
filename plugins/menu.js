import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import fs from 'fs'
let tags = {
  'main': 'MAIN',
  'game': 'GAME',
  'rpg': 'RPG GAMES',
  'xp': 'EXP & LIMIT',
  'sticker': 'STICKER',
  'kerang': 'KERANG AJAIB',
  'quotes': 'QUOTES',
  'group': 'GROUP',
  'internet': 'INTERNET',
  'anonymous': 'ANONYMOUS CHAT',
  'nulis': 'MAGER-NULIS',
  'downloader': 'DOWNLOADER',
  'tools': 'TOOLS',
  'fun': 'FUN',
  'owner': 'OWNER',
  'advanced': 'ADVANCED',
  'info': 'INFO',
  'absen': 'ABSEN',
  'anime': 'ANIME',
  'maker': 'MAKER',
  'audio': 'AUDIO',
  'database': 'DATABASE',
  'canvas': 'CANVAS',
  'spill or drink': 'SOD [ RP ]',
  'kpop': 'K-POP',
  'nsfw': 'NSFW',
  'islamic': 'ISLAMIC',
  'random pict': 'RANDOM PICT',
  'popular sticker': 'POPULAR STICKER',
}
const defaultMenu = {
  before: `%readmore`.trimStart(),
  header: '┏┅┄┄⟞⟦  *%category* ⟧⟝┄┄┉┓\n┃',
    body: '┣❐ %cmd %islimit %isPremium',
  footer: '┃\n┗━━━━┫⌗\n',
  after: `  ${'\n┏━┅┄┄⟞⟦ 𝚁𝙰𝙶𝙸𝙻 𝙱𝙾𝚃 ⟧ ⟝┄┄┉━┓\n┃ ⚘ ◩ ᴄᴀʀᴀ ᴀᴅᴅ ʙᴏᴛ ᴋᴇ ɢʀᴏᴜᴘ ◪   ┃\n┣━━━━━━━━━━━━━━━━━━━━┛\n┃\n┣➢ 𝙺𝙸𝚁𝙸𝙼 𝙻𝙸𝙽𝙺 𝙶𝙲 𝙺𝙴 𝙾𝚆𝙽𝙴𝚁\n┣➢ https/wa.me/6283133162295\n┣➢ 𝚃𝚁𝙸𝙰𝙻 ❸ 𝙷𝙰𝚁𝙸\n┣➢ 𝙼𝙴𝙼𝙱𝙴𝚁 𝙶𝙲 𝙼𝙸𝙽 ⓴ 𝙿𝙴𝚂𝙴𝚁𝚃𝙰\n┣➢ 𝙱𝙾𝚃 𝚆𝙰𝙹𝙸𝙱 𝙰𝙳𝙼𝙸𝙽\n┃\n┣━━━┷━━━━━━━━━━━━┷━━━┓\n┃    Ξ   ☊  𝑗𝑎𝑛𝑔𝑎𝑛 𝑡𝑦𝑝𝑜 𝑛𝑔𝑎𝑏  ☋   Ξ     ┃\n┗━━━━━━━━━━━━━━━━━━━━┛'}`,
}
let handler = async (m, { conn, usedPrefix, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '🅛' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: usedPrefix, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
    const menu = './media/menu.jpg'
    const valor = './media/valor.jpg'
    conn.sendButton(m.chat,
`*–––––––『 MENU 』–––––––*

${wish()}, ${name}

*⇓ ᴄᴏᴍᴍᴀɴᴅ ᴛᴇʀᴄᴀɴᴛᴜᴍ ᴅɪ ʙᴀᴡᴀʜ ⇓*`, text.trim(), `${timeimg()}`, [
      [`ʙᴏᴛ ɪɴғᴏ`, `${usedPrefix}botinfo`],
      [`ᴩʀᴏғɪʟᴇ`, `${usedPrefix}profile`],
      [`ᴊᴀɴɢᴀɴ ᴅɪ ᴋʟɪᴋ`, `${usedPrefix}gcbot`]
    ], m, {asLocation: true})
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|valor|command|commands)$/i

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function wish() {
    let wishloc = ''
  const time = moment.tz('Asia/Jakarta').format('HH')
  wishloc = ('Hi')
  if (time >= 0) {
    wishloc = ('Selamat pagi')
  }
  if (time >= 11) {
    wishloc = ('Selamat siang')
   }
  if (time >= 14) {
    wishloc = ('Selamat sore 🗿')
  }
  if (time >= 15) {
    wishloc = ('Selamat sore')
    }
  if (time >= 17) {
    wishloc = ('Selamat sore bg 🗿')
  }
  if (time >= 19) {
    wishloc = ('️Selamat malam')
  }
  return wishloc
}
function timeimg() {
    let imgloc = ''
  const time = moment.tz('Asia/Jakarta').format('HH')
  imgloc = ('./media/menu.jpg')
  if (time >= 0) {
    imgloc = ('./media/midnight.jpg')
  }
  if (time >= 1) {
    imgloc = ('./media/aftermid.jpg')
  }
  if (time >= 4) {
    imgloc = ('./media/morning.jpg')
  }
  if (time >= 5) {
    imgloc = ('./media/dawn.jpg')
  }
  if (time >= 6) {
    imgloc = ('./media/sunrise.jpg')
  }
  if (time >= 7) {
    imgloc = ('./media/day.jpg')
  }
  if (time >= 12) {
    imgloc = ('./media/noon.jpg')
  }
  if (time >= 14) {
    imgloc = ('./media/afternoon.jpg')
  }
  if (time >= 16) {
    imgloc = ('./media/evening.jpg')
  }
  if (time >= 18) {
    imgloc = ('./media/sunset.jpg')
  }
  if (time >= 19) {
    imgloc = ('./media/night.jpg')
  }
  if (time >= 20) {
    imgloc = ('./media/night.jpg')
  }
  return imgloc
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}