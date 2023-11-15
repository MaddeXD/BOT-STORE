//𝗠𝗘𝗡𝗬𝗘𝗗𝗜𝗔𝗞𝗔𝗡
//› Buy Panel
//› Buy Vps
//› Buy Akun Linode
//› Buy Script
//› Buy Domain

//______________________________
// MINAT ?
// 0877 - 8024 - 1924 [ FOX STORE ]

// MAU NO ENC FULL ? 20K DOANG MAS

"use strict";
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  proto,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@adiwajshing/baileys");
const {
  downloadContentFromMessage,
  generateWAMessage,
  generateWAMessageFromContent,
  MessageType,
  buttonsMessage,
} = require("@adiwajshing/baileys");
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require("./lib/console.js");
const {
  isUrl,
  getRandom,
  getGroupAdmins,
  runtime,
  sleep,
  reSize,
  makeid,
  fetchJson,
  getBuffer,
} = require("./lib/myfunc");
const {
  addResponList,
  delResponList,
  isAlreadyResponList,
  isAlreadyResponListGroup,
  sendResponList,
  updateResponList,
  getDataResponList,
} = require("./lib/addlist");

// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require("chalk");
const axios = require("axios");
const colors = require("colors/safe");
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");

// Database
const setting = JSON.parse(fs.readFileSync("./setting.json"));
const antilink = JSON.parse(fs.readFileSync("./database/antilink.json"));
const mess = JSON.parse(fs.readFileSync("./mess.json"));
const welcome = JSON.parse(fs.readFileSync("./database/welcome.json"));
const db_error = JSON.parse(fs.readFileSync("./database/error.json"));
const db_respon_list = JSON.parse(fs.readFileSync("./database/list.json"));

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async (fox, msg, m, setting, store) => {
  try {
    let { ownerNumber, botName } = setting;
    const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg;
    if (msg.isBaileys) return;
    const jam = moment.tz("asia/jakarta").format("HH:mm:ss");
    const tanggal = moment().tz("Asia/Jakarta").format("ll");
    let dt = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");
    const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);
    const content = JSON.stringify(msg.message);
    const from = msg.key.remoteJid;
    const time = moment(new Date()).format("HH:mm");
    var chats =
      type === "conversation" && msg.message.conversation
        ? msg.message.conversation
        : type === "imageMessage" && msg.message.imageMessage.caption
        ? msg.message.imageMessage.caption
        : type === "videoMessage" && msg.message.videoMessage.caption
        ? msg.message.videoMessage.caption
        : type === "extendedTextMessage" && msg.message.extendedTextMessage.text
        ? msg.message.extendedTextMessage.text
        : type === "buttonsResponseMessage" &&
          quotedMsg.fromMe &&
          msg.message.buttonsResponseMessage.selectedButtonId
        ? msg.message.buttonsResponseMessage.selectedButtonId
        : type === "templateButtonReplyMessage" &&
          quotedMsg.fromMe &&
          msg.message.templateButtonReplyMessage.selectedId
        ? msg.message.templateButtonReplyMessage.selectedId
        : type === "messageContextInfo"
        ? msg.message.buttonsResponseMessage?.selectedButtonId ||
          msg.message.listResponseMessage?.singleSelectReply.selectedRowId
        : type == "listResponseMessage" &&
          quotedMsg.fromMe &&
          msg.message.listResponseMessage.singleSelectReply.selectedRowId
        ? msg.message.listResponseMessage.singleSelectReply.selectedRowId
        : "";
    if (chats == undefined) {
      chats = "";
    }
    const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats)
      ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi)
      : "#";
    const isGroup = msg.key.remoteJid.endsWith("@g.us");
    const sender = isGroup
      ? msg.key.participant
        ? msg.key.participant
        : msg.participant
      : msg.key.remoteJid;
    const isOwner = [
      `${setting.ownerNumber}`,
      "6285811169272@s.whatsapp.net",
    ].includes(sender)
      ? true
      : false;
    const pushname = msg.pushName;
    const body = chats.startsWith(prefix) ? chats : "";
    const budy =
      type === "conversation"
        ? msg.message.conversation
        : type === "extendedTextMessage"
        ? msg.message.extendedTextMessage.text
        : "";
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(" ");
    const isCommand = body.startsWith(prefix);
    const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const isCmd = isCommand
      ? body.slice(1).trim().split(/ +/).shift().toLowerCase()
      : null;
    const botNumber = fox.user.id.split(":")[0] + "@s.whatsapp.net";

    // Group
    const groupMetadata = isGroup ? await fox.groupMetadata(from) : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const groupId = isGroup ? groupMetadata.id : "";
    const participants = isGroup ? await groupMetadata.participants : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
    const isGroupAdmins = groupAdmins.includes(sender);
    const isAntiLink = antilink.includes(from) ? true : false;
    const isWelcome = isGroup ? welcome.includes(from) : false;

    // Quoted
    const quoted = msg.quoted ? msg.quoted : msg;
    const isImage = type == "imageMessage";
    const isQuotedMsg = type == "extendedTextMessage";
    const isMedia = type === "imageMessage" || type === "videoMessage";
    const isQuotedImage = isQuotedMsg
      ? content.includes("imageMessage")
        ? true
        : false
      : false;
    const isVideo = type == "videoMessage";
    const isQuotedVideo = isQuotedMsg
      ? content.includes("videoMessage")
        ? true
        : false
      : false;
    const isSticker = type == "stickerMessage";
    const isQuotedSticker = isQuotedMsg
      ? content.includes("stickerMessage")
        ? true
        : false
      : false;
    const isQuotedAudio = isQuotedMsg
      ? content.includes("audioMessage")
        ? true
        : false
      : false;
    var dataGroup =
      type === "buttonsResponseMessage"
        ? msg.message.buttonsResponseMessage.selectedButtonId
        : "";
    var dataPrivate =
      type === "messageContextInfo"
        ? msg.message.buttonsResponseMessage?.selectedButtonId ||
          msg.message.listResponseMessage?.singleSelectReply.selectedRowId
        : "";
    const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate;
    var dataListG =
      type === "listResponseMessage"
        ? msg.message.listResponseMessage.singleSelectReply.selectedRowId
        : "";
    var dataList =
      type === "messageContextInfo"
        ? msg.message.buttonsResponseMessage?.selectedButtonId ||
          msg.message.listResponseMessage?.singleSelectReply.selectedRowId
        : "";
    const isListMessage = dataListG.length !== 0 ? dataListG : dataList;

    function mentions(teks, mems = [], id) {
      if (id == null || id == undefined || id == false) {
        let res = fox.sendMessage(from, { text: teks, mentions: mems });
        return res;
      } else {
        let res = fox.sendMessage(
          from,
          { text: teks, mentions: mems },
          { quoted: msg }
        );
        return res;
      }
    }

    const mentionByTag =
      type == "extendedTextMessage" &&
      msg.message.extendedTextMessage.contextInfo != null
        ? msg.message.extendedTextMessage.contextInfo.mentionedJid
        : [];
    const mentionByReply =
      type == "extendedTextMessage" &&
      msg.message.extendedTextMessage.contextInfo != null
        ? msg.message.extendedTextMessage.contextInfo.participant || ""
        : "";
    const mention =
      typeof mentionByTag == "string" ? [mentionByTag] : mentionByTag;
    mention != undefined ? mention.push(mentionByReply) : [];
    const mentionUser = mention != undefined ? mention.filter((n) => n) : [];

    async function downloadAndSaveMediaMessage(type_file, path_file) {
      if (type_file === "image") {
        var stream = await downloadContentFromMessage(
          msg.message.imageMessage ||
            msg.message.extendedTextMessage?.contextInfo.quotedMessage
              .imageMessage,
          "image"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        fs.writeFileSync(path_file, buffer);
        return path_file;
      } else if (type_file === "video") {
        var stream = await downloadContentFromMessage(
          msg.message.videoMessage ||
            msg.message.extendedTextMessage?.contextInfo.quotedMessage
              .videoMessage,
          "video"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        fs.writeFileSync(path_file, buffer);
        return path_file;
      } else if (type_file === "sticker") {
        var stream = await downloadContentFromMessage(
          msg.message.stickerMessage ||
            msg.message.extendedTextMessage?.contextInfo.quotedMessage
              .stickerMessage,
          "sticker"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        fs.writeFileSync(path_file, buffer);
        return path_file;
      } else if (type_file === "audio") {
        var stream = await downloadContentFromMessage(
          msg.message.audioMessage ||
            msg.message.extendedTextMessage?.contextInfo.quotedMessage
              .audioMessage,
          "audio"
        );
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        fs.writeFileSync(path_file, buffer);
        return path_file;
      }
    }

    const reply = (teks) => {
      fox.sendMessage(from, { text: teks }, { quoted: msg });
    };

    //Antilink
    if (isGroup && isAntiLink && isBotGroupAdmins) {
      if (
        chats.includes(`https://chat.whatsapp.com/`) ||
        budy.includes(`http://chat.whatsapp.com/`)
      ) {
        if (!isBotGroupAdmins) return reply("Untung bot bukan admin");
        if (isOwner) return reply("Untung lu owner ku:v😙");
        if (isGroupAdmins) return reply("Admin grup mah bebas ygy🤭");
        if (fromMe) return reply("bot bebas Share link");
        await fox.sendMessage(from, { delete: msg.key });
        reply(
          `*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`
        );
        fox.groupParticipantsUpdate(from, [sender], "remove");
      }
    }

    // Response Addlist
    if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
      var get_data_respon = getDataResponList(from, chats, db_respon_list);
      if (get_data_respon.isImage === false) {
        fox.sendMessage(
          from,
          { text: sendResponList(from, chats, db_respon_list) },
          {
            quoted: msg,
          }
        );
      } else {
        fox.sendMessage(
          from,
          {
            image: await getBuffer(get_data_respon.image_url),
            caption: get_data_respon.response,
          },
          {
            quoted: msg,
          }
        );
      }
    }

    const sendContact = (jid, numbers, name, quoted, mn) => {
      let number = numbers.replace(/[^0-9]/g, "");
      const vcard =
        "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        "FN:" +
        name +
        "\n" +
        "ORG:;\n" +
        "TEL;type=CELL;type=VOICE;waid=" +
        number +
        ":+" +
        number +
        "\n" +
        "END:VCARD";
      return fox.sendMessage(
        from,
        {
          contacts: { displayName: name, contacts: [{ vcard }] },
          mentions: mn ? mn : [],
        },
        { quoted: quoted }
      );
    };

    const fkontak = {
      key: {
        fromMe: false,
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net",
      },
      message: {
        extendedTextMessage: {
          text: `BOT STORE MADD`,
          title: ``,
          jpegThumbnail: null,
        },
      },
    };

    if (isGroup && isCmd) {
      console.log(
        colors.green.bold("[Group]") +
          " " +
          colors.brightCyan(time) +
          " " +
          colors.black.bgYellow(command) +
          " " +
          colors.green("from") +
          " " +
          colors.blue(groupName)
      );
    }

    if (!isGroup && isCmd) {
      console.log(
        colors.green.bold("[Private]") +
          " " +
          colors.brightCyan(time) +
          " " +
          colors.black.bgYellow(command) +
          " " +
          colors.green("from") +
          " " +
          colors.blue(pushname)
      );
    }

    // ------------- CASE NYA ------------- //
    switch (command) {
      case "help":
      case "madd":
        {
          const mark_slebew = "0@s.whatsapp.net";
          const more = String.fromCharCode(8206);
          const strip_ny = more.repeat(4001);
          var footer_nya = `Creator by - ${setting.ownerName}`;
          var ramex = `*SCRIPT STORE*`;
          let menu = `*DASHBOARD 📰*
┌⁠──────────
 - *OWNER* : ${setting.ownerName}
 - *JAM* : ${jam}
 - *TANGGAL* : ${tanggal}
└──────────

*LIST PRODUK 🛒*
┌⁠──────────
 - SUNTIK
 - APKPREM
 - TOPUP
 - PROMO
 - PANEL
 - PAYMENT
└──────────

𝗠𝗘𝗡𝗬𝗘𝗗𝗜𝗔𝗞𝗔𝗡
› Jual Panel
› Sewa Bot
› Pasang Bot

*NOTE*
untuk melihat detail produk
silahkan ketik sesuai dengan
list yang tersedia contoh anda
ingin melihat *suntik* ketikan
*.suntik* atau *#suntik*`;
          fox.sendMessage(
            from,
            {
              text: menu,
              mentions: [setting.ownerNumber, sender],
            },
            { quoted: fkontak }
          );
        }
        break;

      case "menu":
        {
          let menu = `
*DASHBOARD 📰*
┌⁠──────────
 - *OWNER* : ${setting.ownerName}
 - *JAM* : ${jam}
 - *TANGGAL* : ${tanggal}
└──────────

*GROUP MENU*
┌⁠──────────
 - addlist *[ WORK]*
 - dellist *[ WORK ]*
 - list *[ WORK ]*
 - group *open*
 - group *close*
 - antilink *on*
 - antilink *off*
 - welcome *on*
 - welcome *off*
 - kick *reply no*
└──────────

*OWNER MENU*
┌⁠──────────
 - join *LINK*
 - block *62XX*
 - unblock *62XX*
 - sendbyr *628XX*
 - sticker
└──────────

*KALKULATOR*
┌⁠──────────
 - tambah *ANGKA*
 - kurang *ANGKA*
 - kali *ANGKA*
 - bagi *ANGKA*
└──────────

𝗠𝗘𝗡𝗬𝗘𝗗𝗜𝗔𝗞𝗔𝗡
› Jual Panel
› Sewa Bot
› Pasang Bot`;
          fox.sendMessage(from, { text: menu }, { quoted: fkontak });
        }
        break;

      case "listproduk":
      case "produk":
        {
          const mark_slebew = "0@s.whatsapp.net";
          const more = String.fromCharCode(8206);
          const strip_ny = more.repeat(4001);
          var footer_nya = `BOT by - ${setting.ownerName}`;
          let tampilan_nya = `Hallo ${pushname}

*LIST PRODUK 🛒*
┌⁠──────────
 - SUNTIK
 - APKPREM
 - TOPUP
 - PROMO
 - PANEL
 - PAYMENT
└──────────

𝗠𝗘𝗡𝗬𝗘𝗗𝗜𝗔𝗞𝗔𝗡
› Jual Panel
› Sewa Bot
› Pasang Bot

*NOTE*
untuk melihat detail produk
silahkan ketik sesuai dengan
list yang tersedia contoh anda
ingin melihat *suntik* ketikan
*.suntik* atau *#suntik*`;
          fox.sendMessage(from, {
            text: tampilan_nya,
            mentions: [setting.ownerNumber, sender],
          });
        }
        break;

      // ------------- SETTING PRODUK ------------- //

      case "bbbmm":
        let hhjkk = ` `;
        fox.sendMessage(from, { text: hhjkk }, { quoted: msg });
        break;

      case "topup":
        let topup = `*LIST TOPUP 🛒*
┌──────────
 - ML
 - FF
 - PUBG
 - UNDAWN
└──────────

𝗠𝗘𝗡𝗬𝗘𝗗𝗜𝗔𝗞𝗔𝗡
› Jual Panel
› Sewa Bot
› Pasang Bot

*NOTE*
untuk melihat detail produk
silahkan ketik sesuai dengan
list yang tersedia contoh anda
ingin melihat *ml* ketikan
*.ml* atau *#ml*
`;
        fox.sendMessage(from, { text: topup }, { quoted: msg });
        break;
      
      case "suntik":
        let stk = `*LIST SUNTIK 🛒*
┌──────────
 - IG
 - FB
 - TWITTER
 - YOUTUBE
 - TELEGRAM
 - SHOPEE
 - TIKTOK
└──────────

𝗠𝗘𝗡𝗬𝗘𝗗𝗜𝗔𝗞𝗔𝗡
› Jual Panel
› Sewa Bot
› Pasang Bot

*NOTE*
untuk melihat detail produk
silahkan ketik sesuai dengan
list yang tersedia contoh anda
ingin melihat *ig* ketikan
*.ig* atau *#ig*
`;
        fox.sendMessage(from, { text: stk }, { quoted: msg });
        break;
      
      case "ig":
        let igsu = ` LIST HARGA INSTAGRAM
Instagram Followers Bule (NO GARANSI Bisa Drop Gak Nentu)
1.000 Followers | Rp5.000,-
2.000 Followers | Rp10.000,-
5.000 Followers | Rp25.000,-
10.000 Followers | Rp50.000,-
20.000 Followers | Rp100.000,

Instagram Followers Bule NON DROP/Permanent
1.000 Followers | Rp 9.000,-
2.000 Followers | Rp 18.000,-
5.000 Followers | Rp 45.000,-
10.000 Followers | Rp 85.000,-
20.000 Followers | Rp 160.000,-

Instagram Followers Indonesia Real Aktif 
500 Followers | Rp 25.000,-
1.000 Followers | Rp 50.000,-
2.000 Followers | Rp 100.000,-
3.000 Followers | Rp 150.000,-
5.000 Followers | Rp 250.000,-


Instaram Likes BULE
200 Likes | Rp 1.000,-
2.000 Likes | Rp 5.000,-
4.000 Likes | Rp 10.000,-
8.000 Likes | Rp 20.000,-

Instagram Likes Indonesia
100 Likes | Rp 1.000,-
500 Likes | Rp 5.000,-
1.000 Likes | Rp 10.000,-
2.000 Likes | Rp 20.000,-

Instagram Views 
2000 Views | Rp5.000,-
5.000 Views | Rp10.000,-
11.000 Views | Rp20.000,- 

*PEMBAYARAN* *:* *DANA/OVO/GOPAY/QRIS/SHOPEEYPAY/BRI*`;
        fox.sendMessage(from, { text: igsu }, { quoted: msg });
        break;
      
      case "fb":
        let fbsu = ` LIST HARGA FACEBOOK
Facebook Post Likes ( Like,Love,Care,Peduli,Wow,Marah Bisa Request)
500 Likes | Rp 8.000,-
1.000 Likes | Rp 15.000,-
2.000 Likes | Rp 30.000,-
5.000 Likes | Rp 150.000,-

Facebook Followers 
1.000 Followers | Rp20.000,-
2.000 Followers | Rp40.000

Facebook Likes & Followers Fanspage/Halaman
100 Followers FP | Rp5.000,-
1.000 Followers FP | Rp50.000,-
2.000 Followers FP | Rp100.000,-
5.000 Followers FP | Rp250.000,-
10.000 Followers FP | Rp500.000,-

*PEMBAYARAN* *:* *DANA/OVO/GOPAY/QRIS/SHOPEEYPAY/BRI* `;
        fox.sendMessage(from, { text: fbsu }, { quoted: msg });
        break;
      
      case "twitter":
        let twit = ` LIST HARGA TWITTER

Followers TWITTER
100 Followers | Rp3.000,-
500 Followers | Rp15.000,-
1.000 Followers | Rp25.000,-
2.000 Followers | Rp50.000,-

Likes Twitter
100 Likes | Rp2.000,-
500 Likes | Rp10.000,-
1.000 Likes | Rp20.000,-
2.000 Likes | Rp40.000,-

Views Twitter
1.000 Views | Rp5.000,-
2.000 Views | Rp10.000,-
5.000 Views | Rp25.000,-
10.000 Views | Rp40.000,-

*PEMBAYARAN* *:* *DANA/OVO/GOPAY/QRIS/SHOPEEYPAY/BRI* `;
        fox.sendMessage(from, { text: twit }, { quoted: msg });
        break;
      
      case "youtube":
        let ytb = ` LIST HARGA YOUTUBE

Subscribers Youtube  (GARANSI SEUMUR HIDUP)
100 Subs | Rp 50.000,-
200 Subs | Rp 100.000,-
500 Subs | Rp 250,000,-
1.000 Subs | Rp 480.000,-

Subscribers Youtube  (NO GARANSI)
100 Subs | Rp 2.000,-
200 Subs | Rp 4.000,-
500 Subs | Rp 10,000,-
1.000 Subs | Rp 20.000,-

Youtube Views Video 
1.000 Views | Rp 15.000,-
2.000 Views | Rp 30.000,-
5.000 Views | Rp 75.000,-

Youtube Likes /Dislikes Video
100 Likes  | Rp 2.000,-
500 Likes  | Rp 10.000,-
1.000 Likes  | Rp 15.000,-

Jam Tayang Youtube ( Wajib Punya Video Diatas 30 Menit)
1.000 Jam Tayang | Rp 120.000,-
2.000 Jam Tayang | Rp 240.000,-
3.000 Jam Tayang | Rp 360.000,-
5.000 Jam Tayang | Rp 550.000,-

*PEMBAYARAN* *:* *DANA/OVO/GOPAY/QRIS/SHOPEEYPAY/BRI* `;
        fox.sendMessage(from, { text: ytb }, { quoted: msg });
        break;
      
      case "tiktok":
        let tiktok = ` LIST HARGA TIKTOK

Tiktok Views
5.000 Views | Rp5.000,-
10.000 Views | Rp10.000,-
50.000 Views | Rp30.000,-

Tiktok Followers
100 Followers | Rp 10.000,-
500 Followers | Rp 50.000,-
1.000 Followers | Rp 90.000,-

Tiktok Likes
100 Likes | Rp 2.000,-
500 Likes | Rp 10.000,-
1.000 Likes | Rp 15.000,-

*PEMBAYARAN* *:* *DANA/OVO/GOPAY/QRIS/SHOPEEYPAY/BRI* `;
        fox.sendMessage(from, { text: tiktok }, { quoted: msg });
        break;
      
      case "telegram":
        let tele = ` LIST HARGA SHOPPE

Telegram Channel Member/Group
500 Member | Rp15.000,-
1000 Member | Rp30.000,-
2.000 Member | Rp55.000,-
5.000 Member | Rp140.000,- 

*PEMBAYARAN* *:* *DANA/OVO/GOPAY/QRIS/SHOPEEYPAY/BRI*`;
        fox.sendMessage(from, { text: tele }, { quoted: msg });
        break;
      
      case "shopee":
        let shopee = ` LIST HARGA SHOPPE

Followers SHOPPE INDONESIA
100 Followers | Rp3.000,-
500 Followers | Rp8.000,-
1.000 Followers | Rp15.000,-
2.000 Followers | Rp30.000,- 

*PEMBAYARAN* *:* *DANA/OVO/GOPAY/QRIS/SHOPEEYPAY/BRI*`;
        fox.sendMessage(from, { text: shopee }, { quoted: msg });
        break;

      case "promo":
        let tp = `•• Promo Kebutuhan Sosmed ••
PriceList:

~Instagram Followers (No Drop)
1k Followers Rp. 9.000
(berlaku kelipatan*)

~Instagram Likes (No Drop)
5k Likes Rp. 5.000
10k Likes Rp. 8.500

~Tiktok Likes (No Drop)
1k Likes Rp. 5.000
5k Likes Rp. 23.000
10k Likes Rp. 44.000

~Tiktok Views (No Drop)
100k Views Rp. 1.000
1M Views Rp. 5.000

~Facebook Followers (No Drop)
1k Followers Rp. 15.000
10k Followers Rp. 130.000

~Shopee Followers (No Drop)
1k Followers Rp. 9.000
10k Followers Rp. 85.000

Order Layanan Lainnya? Ketik .produk

NB: Layanan diatas udah saya coba semua sebelumnya dan work`;
        fox.sendMessage(from, { text: tp }, { quoted: msg });
        break;

      case "ml":
        let ml = ` • List Diamond ML •

💎86       IDR 20.500
💎172     IDR 40.000
💎257     IDR 59.500
💎344     IDR 78.500
💎429     IDR 95.500
💎514     IDR 117.500
💎600     IDR 132.500
💎706     IDR 156.500
💎878     IDR 193.500
💎963     IDR 208.500
💎1050   IDR 231.500
💎1136   IDR 245.000
💎1220   IDR 267.500
💎1412   IDR 310.500    
💎2195   IDR 462.500
💎3073   IDR 663.000
💎3688   IDR 783.000
💎4390   IDR 913.500
💎5532   IDR 1.168.500
💎9288   IDR 1.933.500 `;
        fox.sendMessage(from, { text: ml }, { quoted: msg });
        break;
        
      case "panel":
        let pnl = ` *💵 PRICE LIST HARGA PANEL 💵*

▪️1GB 35% CPU 2K / Bulan
▪️2GB 75% CPU 4K/ Bulan
▪️3GB 100% CPU 5K / Bulan
▪️4GB 125% CPU 6K / Bulan
▪️5GB 150% CPU 7K / Bulan
▪️6GB 175% CPU 8K / Bulan
▪️7GB 200% CPU 9K / Bulan
▪️8GB 250% CPU 10K / Bulan
▪️Unlimited CPU 15K / Bulan

    *[KEUNTUNGAN PANEL ]*

⭕Untuk Bikin Bot
⭕Tidak Memboros Kouta
⭕Bot Menjadi On 24 Jam
⭕Bot Menjadi Fast Respon
⭕Web Pannel Close Bot Tetap On

*Kelebihan Panel Disini :* 
 • Garansi 
 • Sebelum 1 Bulan Panel Mokad 
   Maka Akan Diganti Ulang

*PEMBAYARAN* *:* *DANA/OVO/GOPAY/QRIS/SHOPEEYPAY/BRI/MANDIRI*

 `;
        fox.sendMessage(from, { text: pnl }, { quoted: msg });
        break;

      case "ff":
        let ff = ` `;
        fox.sendMessage(from, { text: ff }, { quoted: msg });
        break;

      case "pubg":
        let pubg = ` `;
        fox.sendMessage(from, { text: pubg }, { quoted: msg });
        break;

      case "undawn":
        let undawn = ` `;
        fox.sendMessage(from, { text: undawn }, { quoted: msg });
        break;
      
      case "apkprem":
        let apk = `*LIST APLIKASI PREMIUM 🛒*
┌⁠──────────
 - YOUTUBE
 - BSTATION
 - WETV
 - SPOTIFY
 - NETFLIX
 - CANVA
└──────────

𝗠𝗘𝗡𝗬𝗘𝗗𝗜𝗔𝗞𝗔𝗡
› Jual Panel
› Sewa Bot
› Pasang Bot

*NOTE*
untuk melihat detail produk
silahkan ketik sesuai dengan
list yang tersedia contoh anda
ingin melihat *youtube* ketikan
*.youtube* atau *#youtube*
`;
        fox.sendMessage(from, { text: apk }, { quoted: msg });
        break;
        
      case "youtube":
        let yt = ` *YOUTUBE PREMIUM*

1 BULAN
•Email Cust ; Rp 1.500


4 BULAN
• Email Cust : Rp 10.000
• Email seller : Rp 15.000


6 BULAN (KOSONG)
• Email Cust : Rp 8.000
• Email Seller : Rp. 10.000

> Nogar
> Bisa pakai email fresh
> Untuk akun seller tanyakan stok terlebih dahulu sebelum order/tf `;
        fox.sendMessage(from, { text: yt }, { quoted: msg });
        break;

      case "bstation":
        let bst = ` *BSTATION*

1 BULAN : Rp 15.000
1 TAHUN : Rp 25.000

*Note*
- Akun dari seller
- Full garansi
- Ini akun sharing `;
        fox.sendMessage(from, { text: bst }, { quoted: msg });
        break;

      case "wetv":
        let wetv = ` *WETV VIP*

*SHARING*
1 BULAN : Rp 15.000
3 BULAN : Rp 25.000

*PRIVATE*
1 BULAN : Rp 45.000 `;
        fox.sendMessage(from, { text: wetv }, { quoted: msg });
        break;
        
      case "spotify":
        let sptf = ` *SPOTIFY PREMIUM*

*VIA INVITE FULLGAR*
1 BULAN : Rp 8.000

*INDIVIDUAL*
2 BULAN : Rp 15.000
3 BULAN : Rp 20.000

> Via invite
> Region indonesia
> Individual akun disediakan seller `;
        fox.sendMessage(from, { text: sptf }, { quoted: msg });
        break;

      case "netflix":
        let netf = ` *NETFLIX PREMIUM*

• 1 BULAN SHARING
1P1U : Rp 25.000
1P2U : Rp 20.000

> Jika sharing tidak boleh otak atik akun
> Akun disediakan seller
> Full garansi sesuai syarat & ketentuan `;
        fox.sendMessage(from, { text: netf }, { quoted: msg });
        break;

      case "canva":
        let canva = ` *CANVA PRO*

*45 HARI INVITE*
MEMBER : Rp 5.000
DESIGNER : Rp 8.000

*OWNER/HEAD*
30 HARI : Rp 10.000
45 HARI : Rp 15.000

> Invite via email
> Owner/head akun dari seller
> Untuk owner tidak ada garansi
> Owner bisa invite 500+ member `;
        fox.sendMessage(from, { text: canva }, { quoted: msg });
        break;

      // -------------  BATAS SETTING PRODUK ------------- //

      case "owner":
        {
          var owner_Nya = setting.ownerNumber;
          sendContact(from, owner_Nya, setting.ownerName, msg);
        }
        break;

      case "sticker":
      case "s":
      case "stiker":
        {
          if (isImage || isQuotedImage) {
            let media = await downloadAndSaveMediaMessage(
              "image",
              `./gambar/${tanggal}.jpg`
            );
            reply(mess.wait);
            fox.sendImageAsSticker(from, media, msg, {
              packname: `${setting.namaStore}`,
              author: `Store Bot Madd`,
            });
          } else if (isVideo || isQuotedVideo) {
            let media = await downloadAndSaveMediaMessage(
              "video",
              `./sticker/${tanggal}.mp4`
            );
            reply(mess.wait);
            fox.sendVideoAsSticker(from, media, msg, {
              packname: `${setting.namaStore}`,
              author: `Store Bot Madd`,
            });
          } else {
            reply(
              `Kirim/reply gambar/vidio dengan caption *${prefix + command}*`
            );
          }
        }
        break;

      case "join":
        {
          if (!isOwner) return reply(mess.OnlyOwner);
          if (!q) return reply(`Kirim perintah ${prefix + command} _linkgrup_`);
          var ini_urrrl = q.split("https://chat.whatsapp.com/")[1];
          var data = await fox
            .groupAcceptInvite(ini_urrrl)
            .then((res) => reply(`Berhasil Join ke grup...`))
            .catch((err) =>
              reply(`Eror.. Munkin bot telah di kick Dari grup tersebut`)
            );
        }
        break;

      // ------------- SETTING PEMBAYARAN ------------- //

      case "donasi":
      case "donate":
        {
          let tekssss = `*「 DONASI MENU 」*

› GOPAY : ${setting.gopay}
› DANA : ${setting.dana}
› OVO : ${setting.ovo}
› QRISH : *SCAN FOTO DI ATAS*

*Berapapun Donasinya Sangat Berarti Bagi kami✨*
`;
          fox.sendMessage(
            from,
            {
              image: fs.readFileSync(`./gambar/qris.jpg`),
              caption: tekssss,
              footer: `${setting.ownerName} © 2022`,
            },
            { quoted: msg }
          );
        }
        break;

      case "sendbyr":
        {
          if (!isOwner) return reply(mess.OnlyOwner);
          if (!q) return reply("*Contoh:*\n.add 628xxx");
          var number = q.replace(/[^0-9]/gi, "") + "@s.whatsapp.net";
          let tekssss = `*「 𝗣𝗔𝗬𝗠𝗘𝗡𝗧 𝗠𝗘𝗡𝗨 」*

› GOPAY : ${setting.gopay}
› DANA : ${setting.dana}
› OVO : ${setting.ovo}
› QRISH : *SCAN FOTO DI ATAS*

*Jangan lupa sertakan bukti transfer nya ✨*
`;
          fox.sendMessage(
            number,
            {
              image: fs.readFileSync(`./gambar/qris.jpg`),
              caption: tekssss,
              footer: `${setting.ownerName} © 2022`,
            },
            { quoted: msg }
          );
          reply(`*DONE ✅*\n
tagihan pembayaran telah terkirim`);
        }
        break;

      case "payment":
      case "pembayaran":
      case "bayar":
        {
          let tekssss = `*「 𝗣𝗔𝗬𝗠𝗘𝗡𝗧 𝗠𝗘𝗡𝗨 」*

› GOPAY : ${setting.gopay}
› DANA : ${setting.dana}
› OVO : ${setting.ovo}
› QRISH : *SCAN FOTO DI ATAS*

*Jangan lupa sertakan bukti transfer nya ✨*

*JIKA SUDAH MELAKUKAN PEMBAYARAN KETIK* *.proses*`;
          fox.sendMessage(
            from,
            {
              image: fs.readFileSync(`./gambar/qris.jpg`),
              caption: tekssss,
              footer: `${setting.ownerName} © 2023`,
            },
            { quoted: msg }
          );
        }
        break;

      case "proses":
        {
          let tek = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`🎀 PRODUK : ${q}\n📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\nbaik ka mohon d tunggu pesanan sedang d proses`;
          fox.sendMessage(from, { text: tek });
          fox.sendMessage(`${setting.ownerNumber}`, {
            text: `**OM ADA ORDERAN NIH🐦*\n\n*IDENTITAS BUYER*\n\nNAMA : ${pushname}\nNUMBER : ${
              sender.split("@")[0]
            }\n\n*SILAHKAN DI CEK*`,
          });
        }
        break;
      case "done":
        {
          let tek = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih Telah order di *${setting.namaStore}*\nNext Order ya🙏`;
          fox.sendMessage(from, { text: tek });
        }
        break;

      // ------------- BATAS SETTING PEMBAYARAN ------------- //

      // ------------- SETTING KALKULATOR ------------- //

      case "tambah":
        if (!q)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1+2`);
        var num_one = q.split("+")[0];
        var num_two = q.split("+")[1];
        if (!num_one)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1+2`);
        if (!num_two)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1+2`);
        var nilai_one = Number(num_one);
        var nilai_two = Number(num_two);
        reply(`${nilai_one + nilai_two}`);
        break;

      case "kurang":
        if (!q)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 2-2`);
        var num_one = q.split("-")[0];
        var num_two = q.split("-")[1];
        if (!num_one)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 2-2`);
        if (!num_two)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 2-2`);
        var nilai_one = Number(num_one);
        var nilai_two = Number(num_two);
        reply(`${nilai_one - nilai_two}`);
        break;

      case "kali":
        if (!q)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1*2`);
        var num_one = q.split("*")[0];
        var num_two = q.split("*")[1];
        if (!num_one)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1*2`);
        if (!num_two)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1*2`);
        var nilai_one = Number(num_one);
        var nilai_two = Number(num_two);
        reply(`${nilai_one * nilai_two}`);
        break;

      case "bagi":
        if (!q)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1/2`);
        var num_one = q.split("/")[0];
        var num_two = q.split("/")[1];
        if (!num_one)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1/2`);
        if (!num_two)
          return reply(`*Bukan gitu om🐦*\n\n

Contoh :\n
.tambah 1/2`);
        var nilai_one = Number(num_one);
        var nilai_two = Number(num_two);
        reply(`${nilai_one / nilai_two}`);
        break;
      // ------------- BATAS SETTING KALKULATOR ------------- //

      // ------------- SETTING GROUP MENU ------------- //
      case "hidetag":
        if (!isGroup) return reply(mess.OnlyGroup);
        if (!isGroupAdmins) return reply(mess.GrupAdmin);
        if (!isBotGroupAdmins) return reply(mess.BotAdmin);
        let mem = [];
        groupMembers.map((i) => mem.push(i.id));
        fox.sendMessage(from, { text: q ? q : "", mentions: mem });
        break;

      case "antilink":
        {
          if (!isGroup) return reply(mess.OnlyGroup);
          if (!isGroupAdmins) return reply(mess.GrupAdmin);
          if (!isBotGroupAdmins) return reply(mess.BotAdmin);
          if (!args[0])
            return reply(
              `Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`
            );
          if (args[0] == "ON" || args[0] == "on" || args[0] == "On") {
            if (isAntiLink) return reply("Antilink sudah aktif");
            antilink.push(from);
            fs.writeFileSync(
              "./database/antilink.json",
              JSON.stringify(antilink, null, 2)
            );
            reply("Successfully Activate Antilink In This Group");
          } else if (
            args[0] == "OFF" ||
            args[0] == "OF" ||
            args[0] == "Of" ||
            args[0] == "Off" ||
            args[0] == "of" ||
            args[0] == "off"
          ) {
            if (!isAntiLink) return reply("Antilink belum aktif");
            let anu = antilink.indexOf(from);
            antilink.splice(anu, 1);
            fs.writeFileSync(
              "./database/antilink.json",
              JSON.stringify(antilink, null, 2)
            );
            reply("Successfully Disabling Antilink In This Group");
          } else {
            reply("Kata kunci tidak ditemukan!");
          }
        }
        break;

      case "group":
      case "grup":
        if (!isGroup) return reply(mess.OnlyGroup);
        if (!isGroupAdmins) return reply(mess.GrupAdmin);
        if (!isBotGroupAdmins) return reply(mess.BotAdmin);
        if (!q)
          return reply(
            `Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`
          );
        if (args[0] == "close") {
          fox.groupSettingUpdate(from, "announcement");
          reply(
            `Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`
          );
        } else if (args[0] == "open") {
          fox.groupSettingUpdate(from, "not_announcement");
          reply(
            `Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`
          );
        } else {
          reply(
            `Kirim perintah .${command} _options_\nOptions : close & open\nContoh : .${command} close`
          );
        }
        break;

      case "kick":
        if (!isGroup) return reply(mess.OnlyGroup);
        if (!isGroupAdmins) return reply(mess.GrupAdmin);
        if (!isBotGroupAdmins) return reply(mess.BotAdmin);
        var number;
        if (mentionUser.length !== 0) {
          number = mentionUser[0];
          fox
            .groupParticipantsUpdate(from, [number], "remove")
            .then((res) => reply(`*Sukses mengeluarkan member..!*`))
            .catch((err) => reply(mess.error.api));
        } else if (isQuotedMsg) {
          number = quotedMsg.sender;
          fox
            .groupParticipantsUpdate(from, [number], "remove")
            .then((res) => reply(`*Sukses mengeluarkan member..!*`))
            .catch((err) => reply(mess.error.api));
        } else {
          reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`);
        }
        break;

      case "welcome":
        {
          if (!isGroup) return reply("Khusus Group!");
          if (!msg.key.fromMe && !isOwner && !isGroupAdmins)
            return reply("Mau ngapain?, Fitur ini khusus admin");
          if (!args[0])
            return reply("*Kirim Format*\n\n.welcome on\n.welcome off");
          if (args[0] == "ON" || args[0] == "on" || args[0] == "On") {
            if (isWelcome) return reply("Sudah aktif✓");
            welcome.push(from);
            fs.writeFileSync(
              "./database/welcome.json",
              JSON.stringify(welcome)
            );
            reply("Suksess mengaktifkan welcome di group:\n" + groupName);
          } else if (
            args[0] == "OFF" ||
            args[0] == "OF" ||
            args[0] == "Of" ||
            args[0] == "Off" ||
            args[0] == "of" ||
            args[0] == "off"
          ) {
            var posi = welcome.indexOf(from);
            welcome.splice(posi, 1);
            fs.writeFileSync(
              "./database/welcome.json",
              JSON.stringify(welcome)
            );
            reply("Success menonaktifkan welcome di group:\n" + groupName);
          } else {
            reply("Kata kunci tidak ditemukan!");
          }
        }
        break;

      case "block":
        {
          if (!isOwner && !fromMe) return reply(mess.OnlyOwner);
          if (!q)
            return reply(
              `Ex : ${
                prefix + command
              } Nomor Yang Ingin Di Block\n\nContoh :\n${
                prefix + command
              } 628xxxx`
            );
          let nomorNya = q;
          await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block"); // Block user
          reply("Sukses Block Nomor");
        }
        break;

      case "unblock":
        {
          if (!isOwner && !fromMe) return reply(mess.OnlyOwner);
          if (!q)
            return reply(
              `Ex : ${
                prefix + command
              } Nomor Yang Ingin Di Unblock\n\nContoh :\n${
                prefix + command
              } 628xxxx`
            );
          let nomorNya = q;
          await conn.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock");
          reply("Sukses Unblock Nomor");
        }
        break;

      // ------------------ CASE ADDLIST ------------------ //

      case "shop":
      case "list":
        function _0x112e(_0x354d41, _0x44f039) {
          const _0x2d9050 = _0x2d90();
          return (
            (_0x112e = function (_0x112e4d, _0x231e85) {
              _0x112e4d = _0x112e4d - 0xcd;
              let _0xf98ada = _0x2d9050[_0x112e4d];
              return _0xf98ada;
            }),
            _0x112e(_0x354d41, _0x44f039)
          );
        }
        const _0x1df2c9 = _0x112e;
        function _0x2d90() {
          const _0x5ca7e8 = [
            "5985504LmgYMe",
            "10xBconn",
            "*hallo\x20",
            "key",
            "63jJSwIZ",
            "sendMessage",
            "Belum\x20ada\x20list\x20message\x20yang\x20terdaftar\x20di\x20group\x20ini",
            "6268530vgGApt",
            "820673CtkcKP",
            "3rHVeRr",
            "OnlyGrup",
            "1050716hOLtCO",
            "6185680YyDDwt",
            "*LIST\x20:*\x20",
            "74998MQQjMn",
            "title",
            "Belum\x20ada\x20list\x20message\x20di\x20database",
            "length",
            "2695890jTqeHA",
          ];
          _0x2d90 = function () {
            return _0x5ca7e8;
          };
          return _0x2d90();
        }
        (function (_0x5742f1, _0x2d7fff) {
          const _0xf8ea70 = _0x112e,
            _0x347138 = _0x5742f1();
          while (!![]) {
            try {
              const _0x4db20b =
                -parseInt(_0xf8ea70(0xd6)) / 0x1 +
                (-parseInt(_0xf8ea70(0xdc)) / 0x2) *
                  (parseInt(_0xf8ea70(0xd7)) / 0x3) +
                (-parseInt(_0xf8ea70(0xd9)) / 0x4) *
                  (parseInt(_0xf8ea70(0xcf)) / 0x5) +
                -parseInt(_0xf8ea70(0xcd)) / 0x6 +
                -parseInt(_0xf8ea70(0xce)) / 0x7 +
                -parseInt(_0xf8ea70(0xda)) / 0x8 +
                (-parseInt(_0xf8ea70(0xd2)) / 0x9) *
                  (-parseInt(_0xf8ea70(0xd5)) / 0xa);
              if (_0x4db20b === _0x2d7fff) break;
              else _0x347138["push"](_0x347138["shift"]());
            } catch (_0x3dc42b) {
              _0x347138["push"](_0x347138["shift"]());
            }
          }
        })(_0x2d90, 0xe247c);
        if (!isGroup) return reply(mess[_0x1df2c9(0xd8)]);
        if (db_respon_list[_0x1df2c9(0xdf)] === 0x0)
          return reply(_0x1df2c9(0xde));
        if (!isAlreadyResponListGroup(from, db_respon_list))
          return reply(_0x1df2c9(0xd4));
        var arr_rows = [];
        for (let x of db_respon_list) {
          x["id"] === from &&
            arr_rows["push"]({ title: x["key"], rowId: x[_0x1df2c9(0xd1)] });
        }
        let tekny =
          _0x1df2c9(0xd0) +
          pushname +
          "*\x0a\x0aini\x20list\x20yang\x20tersedia\x20di\x20group\x20ini\x0a\x0a*CRATED\x20BY\x20MADD_STORE*\x0a\x0aSilahkan\x20di\x20ketik\x20sesuai\x20keinginan\x20!!\x0a";
        for (let i of arr_rows) {
          tekny += _0x1df2c9(0xdb) + i[_0x1df2c9(0xdd)] + "\x0a";
        }
        var listMsg = { text: tekny };
        fox[_0x1df2c9(0xd3)](from, listMsg);
        break;

      case "addlist":
        function _0x21cd() {
          var _0x1ecd3c = [
            "8OEyuku",
            "*LIST\x20BERHASIL\x20DI\x20TAMBAHKAN\x20✅*",
            "6513363ehVeES",
            "1060764fPedQT",
            "untuk\x20menambah\x20list\x0a\x0aketikan\x20*cmd|teks*\x0a\x0a*CREATED\x20BY\x20MADD_STORE*\x0a\x0acontoh\x20:\x0a\x0a.addlist\x20panel|berikut\x20harga\x20panel...",
            "*\x20sudah\x20ada\x20di\x20group\x20ini",
            "OnlyGrup",
            "70944OnUArm",
            "190ThvgvK",
            "split",
            "23721874MKgxRq",
            "55128WcPzHn",
            "6ZtZPzm",
            "896zzVVYH",
            "4838260SfhXgy",
            "164513sUdpuN",
            "includes",
            "list\x20dengan\x20cmd\x0a\x0a\x0a*",
          ];
          _0x21cd = function () {
            return _0x1ecd3c;
          };
          return _0x21cd();
        }
        var _0xefd32 = _0x43ea;
        (function (_0x23e19d, _0x93c3e2) {
          var _0x35796e = _0x43ea,
            _0x330be0 = _0x23e19d();
          while (!![]) {
            try {
              var _0x3fe278 =
                (-parseInt(_0x35796e(0x1db)) / 0x1) *
                  (-parseInt(_0x35796e(0x1d8)) / 0x2) +
                parseInt(_0x35796e(0x1cf)) / 0x3 +
                (-parseInt(_0x35796e(0x1d7)) / 0x4) *
                  (parseInt(_0x35796e(0x1d4)) / 0x5) +
                (-parseInt(_0x35796e(0x1d3)) / 0x6) *
                  (-parseInt(_0x35796e(0x1d9)) / 0x7) +
                (parseInt(_0x35796e(0x1cc)) / 0x8) *
                  (parseInt(_0x35796e(0x1ce)) / 0x9) +
                parseInt(_0x35796e(0x1da)) / 0xa +
                -parseInt(_0x35796e(0x1d6)) / 0xb;
              if (_0x3fe278 === _0x93c3e2) break;
              else _0x330be0["push"](_0x330be0["shift"]());
            } catch (_0x564783) {
              _0x330be0["push"](_0x330be0["shift"]());
            }
          }
        })(_0x21cd, 0xd8c4a);
        if (!isGroup) return reply(mess[_0xefd32(0x1d2)]);
        if (!isGroupAdmins && !isOwner) return reply(mess["GrupAdmin"]);
        var args1 = q["split"]("|")[0x0],
          args2 = q[_0xefd32(0x1d5)]("|")[0x1];
        if (!q[_0xefd32(0x1ca)]("|")) return reply(_0xefd32(0x1d0));
        if (isAlreadyResponList(from, args1, db_respon_list))
          return reply(_0xefd32(0x1cb) + args1 + _0xefd32(0x1d1));
        function _0x43ea(_0x3ebddb, _0x572105) {
          var _0x21cd62 = _0x21cd();
          return (
            (_0x43ea = function (_0x43ea71, _0x211598) {
              _0x43ea71 = _0x43ea71 - 0x1ca;
              var _0x1c00d7 = _0x21cd62[_0x43ea71];
              return _0x1c00d7;
            }),
            _0x43ea(_0x3ebddb, _0x572105)
          );
        }
        addResponList(from, args1, args2, ![], "-", db_respon_list),
          reply(_0xefd32(0x1cd));
        break;

      case "dellist":
        {
          const _0x227fa4 = _0xc33c;
          (function (_0x1488f5, _0x479ff7) {
            const _0x35977b = _0xc33c,
              _0x53e24c = _0x1488f5();
            while (!![]) {
              try {
                const _0x361b8c =
                  parseInt(_0x35977b(0xaf)) / 0x1 +
                  (-parseInt(_0x35977b(0xb4)) / 0x2) *
                    (-parseInt(_0x35977b(0xa8)) / 0x3) +
                  (-parseInt(_0x35977b(0xb3)) / 0x4) *
                    (parseInt(_0x35977b(0xaa)) / 0x5) +
                  (-parseInt(_0x35977b(0xae)) / 0x6) *
                    (-parseInt(_0x35977b(0xa9)) / 0x7) +
                  -parseInt(_0x35977b(0xa4)) / 0x8 +
                  parseInt(_0x35977b(0xa6)) / 0x9 +
                  -parseInt(_0x35977b(0xa2)) / 0xa;
                if (_0x361b8c === _0x479ff7) break;
                else _0x53e24c["push"](_0x53e24c["shift"]());
              } catch (_0x4b965e) {
                _0x53e24c["push"](_0x53e24c["shift"]());
              }
            }
          })(_0x411e, 0x333d2);
          if (!isGroup) return reply(mess[_0x227fa4(0xac)]);
          function _0x411e() {
            const _0x1b84b9 = [
              "1763260HTYOWi",
              ".hapuslist\x20",
              "1977256pPcyhw",
              "*hallo\x20",
              "1093662Pdlxsd",
              "title",
              "45AiOMDw",
              "189714GsOhmX",
              "1305415anvaDV",
              "push",
              "OnlyGrup",
              "Belum\x20ada\x20list\x20message\x20di\x20database",
              "42jTkwDg",
              "332228zbAIKq",
              "*LIST*\x20:\x20",
              "length",
              "sendMessage",
              "4jwOJmv",
              "33464QFuaMp",
              "key",
              "*\x0a\x0auntuk\x20menghapus\x20list\x20ketikan\x0a\x0a*CRATED\x20BY\x20MADD\x20_STORE*\x0a\x0aContoh\x20:\x20\x0a\x0a.hapus\x20panel\x0a\x0a",
            ];
            _0x411e = function () {
              return _0x1b84b9;
            };
            return _0x411e();
          }
          if (!isGroupAdmins && !isOwner) return reply(mess["GrupAdmin"]);
          if (db_respon_list[_0x227fa4(0xb1)] === 0x0)
            return reply(_0x227fa4(0xad));
          var arr_rows = [];
          for (let x of db_respon_list) {
            x["id"] === from &&
              arr_rows[_0x227fa4(0xab)]({
                title: x[_0x227fa4(0xb5)],
                rowId: _0x227fa4(0xa3) + x[_0x227fa4(0xb5)],
              });
          }
          let tekny = _0x227fa4(0xa5) + pushname + _0x227fa4(0xa1);
          function _0xc33c(_0x1f76ae, _0x37cdac) {
            const _0x411efe = _0x411e();
            return (
              (_0xc33c = function (_0xc33c81, _0x30b4c9) {
                _0xc33c81 = _0xc33c81 - 0xa1;
                let _0x197110 = _0x411efe[_0xc33c81];
                return _0x197110;
              }),
              _0xc33c(_0x1f76ae, _0x37cdac)
            );
          }
          for (let i of arr_rows) {
            tekny += _0x227fa4(0xb0) + i[_0x227fa4(0xa7)] + "\x0a";
          }
          var listMsg = { text: tekny };
          fox[_0x227fa4(0xb2)](from, listMsg);
        }
        break;

      case "hapuslist":
        function _0x312e() {
          var _0x144150 = [
            "2864444Zlqnvj",
            "2848XCVPSA",
            "127157eTHfQT",
            "12117nMzzWb",
            "2519650SpLcBV",
            "*\x0a\x0aBERHASIL\x20DI\x20HAPUS",
            "1661718CzlvCW",
            "1249335yaUIJr",
            "LIST\x20DENGAN\x20CMD\x20*",
            "12CnjrSY",
            "506274jLNkRl",
          ];
          _0x312e = function () {
            return _0x144150;
          };
          return _0x312e();
        }
        var _0x517af3 = _0x32b4;
        function _0x32b4(_0x4d6d0d, _0x4853be) {
          var _0x312e0d = _0x312e();
          return (
            (_0x32b4 = function (_0x32b45c, _0x2b0f6b) {
              _0x32b45c = _0x32b45c - 0x74;
              var _0x34e004 = _0x312e0d[_0x32b45c];
              return _0x34e004;
            }),
            _0x32b4(_0x4d6d0d, _0x4853be)
          );
        }
        (function (_0x434da0, _0x5330c6) {
          var _0x14c14c = _0x32b4,
            _0x476e5a = _0x434da0();
          while (!![]) {
            try {
              var _0x1d0ae9 =
                (-parseInt(_0x14c14c(0x75)) / 0x1) *
                  (parseInt(_0x14c14c(0x7c)) / 0x2) +
                parseInt(_0x14c14c(0x79)) / 0x3 +
                parseInt(_0x14c14c(0x7e)) / 0x4 +
                -parseInt(_0x14c14c(0x77)) / 0x5 +
                -parseInt(_0x14c14c(0x7d)) / 0x6 +
                (-parseInt(_0x14c14c(0x76)) / 0x7) *
                  (-parseInt(_0x14c14c(0x74)) / 0x8) +
                -parseInt(_0x14c14c(0x7a)) / 0x9;
              if (_0x1d0ae9 === _0x5330c6) break;
              else _0x476e5a["push"](_0x476e5a["shift"]());
            } catch (_0x434f60) {
              _0x476e5a["push"](_0x476e5a["shift"]());
            }
          }
        })(_0x312e, 0x60b9b),
          delResponList(from, q, db_respon_list),
          reply(_0x517af3(0x7b) + q + _0x517af3(0x78));
        break;

      // ------------------ BATAS ADDLIST ------------------ //

      // ------------- BATAS SETTING GROUP MENU ------------- //

      case "sc":
      case "script":
      case "scbot":
      case "scriptbot":
        {
          function _0x1059(_0x27bf41, _0x2be49b) {
            var _0x4a1baf = _0x4a1b();
            return (
              (_0x1059 = function (_0x1059d8, _0x626231) {
                _0x1059d8 = _0x1059d8 - 0xc2;
                var _0x47e8b6 = _0x4a1baf[_0x1059d8];
                return _0x47e8b6;
              }),
              _0x1059(_0x27bf41, _0x2be49b)
            );
          }
          var _0x3bbc96 = _0x1059;
          (function (_0x94de99, _0x1b414f) {
            var _0x5f113c = _0x1059,
              _0x2bbbc8 = _0x94de99();
            while (!![]) {
              try {
                var _0x146be5 =
                  parseInt(_0x5f113c(0xca)) / 0x1 +
                  -parseInt(_0x5f113c(0xc8)) / 0x2 +
                  (-parseInt(_0x5f113c(0xc6)) / 0x3) *
                    (-parseInt(_0x5f113c(0xcb)) / 0x4) +
                  parseInt(_0x5f113c(0xc9)) / 0x5 +
                  (-parseInt(_0x5f113c(0xc5)) / 0x6) *
                    (parseInt(_0x5f113c(0xc2)) / 0x7) +
                  parseInt(_0x5f113c(0xc4)) / 0x8 +
                  -parseInt(_0x5f113c(0xc7)) / 0x9;
                if (_0x146be5 === _0x1b414f) break;
                else _0x2bbbc8["push"](_0x2bbbc8["shift"]());
              } catch (_0x3caf0e) {
                _0x2bbbc8["push"](_0x2bbbc8["shift"]());
              }
            }
          })(_0x4a1b, 0x9e30c),
            reply(_0x3bbc96(0xc3));
          function _0x4a1b() {
            var _0xeca30 = [
              "2057690TAzabq",
              "6075525JoWxIh",
              "752594JtBtIv",
              "2188rwqqFr",
              "21eaIrPP",
              "*SCRIPT\x20STORE\x20V3*\x0a@FoxHostt\x0a\x0aUntuk\x20Script\x20nya\x20bisa\x20kalian\x20dapatkan\x20di\x20YouTube\x20saya\x0ahttps://youtube.com/@FoxHostt\x0a\x0aJUDUL\x20VIDEO:\x0aSC\x20STORE\x20V3\x0a",
              "4150248kmXghf",
              "349746KUgVem",
              "3537snQZCV",
              "11517543IwXpYV",
            ];
            _0x4a1b = function () {
              return _0xeca30;
            };
            return _0x4a1b();
          }
        }
        break;

      // ------------- BATAS CASE ------------- //
      // ------------- BATAS CASE ------------- //
      default:
        if (
          budy &&
          [
            "assalamu'alaikum",
            "Assalamu'alaikum",
            "Assalamualaikum",
            "assalamualaikum",
            "Assalammualaikum",
            "assalammualaikum",
            "Asalamualaikum",
            "asalamualaikum",
            "Asalamu'alaikum",
            " asalamu'alaikum",
          ].includes(budy) &&
          !isCmd
        ) {
          fox.sendMessage(from, {
            text: `${pickRandom([
              "Wa'alaikumussalam",
              "Wa'alaikumussalam Wb.",
              "Wa'alaikumussalam Wr. Wb.",
              "Wa'alaikumussalam Warahmatullahi Wabarakatuh",
            ])}`,
          });
        }
        if (
          budy &&
          ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["suntik", "Suntik", "SUNTIK"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["APKPREM", "apkprem", "ApkPrem", "App Premium"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["topup", "Topup", "TOPUP"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["promo", "Promo", "Promo"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["panel", "Panel", "PANEL"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["Payment", "payment", "PAYMENT", "bayar"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
        if (
          budy &&
          ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(
            budy
          ) &&
          !isCmd
        ) {
          fox.sendMessage(from, { text: `${runtime(process.uptime())}*` });
        }
    }
  } catch (err) {
    console.log(color("[ERROR]", "red"), err);
    const isGroup = msg.key.remoteJid.endsWith("@g.us");
    const sender = isGroup
      ? msg.key.participant
        ? msg.key.participant
        : msg.participant
      : msg.key.remoteJid;
    const moment = require("moment-timezone");
    const jam = moment.tz("asia/jakarta").format("HH:mm:ss");
    const tanggal = moment().tz("Asia/Jakarta").format("ll");
    let kon_erorr = { tanggal: tanggal, jam: jam, error: err, user: sender };
    db_error.push(kon_erorr);
    fs.writeFileSync("./database/error.json", JSON.stringify(db_error));
    var errny = `*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`;
    fox.sendMessage("6285811169272", { text: errny, mentions: [sender] });
  }
};