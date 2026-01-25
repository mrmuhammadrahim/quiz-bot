
const TelegramBot = require("node-telegram-bot-api")
const fs = require("fs/promises")
const mammoth = require("mammoth")
require("dotenv").config()

if( !process.env.BOT_TOKEN ){
    console.log("Env faylda bot token topilmadi! ")
    return
}

const bot = new TelegramBot( process.env.BOT_TOKEN, {polling: true} )

bot.on("message", async msg => {
    const chatId = msg.chat.id
    const text = msg.text

    if( text == "/start"){
        return bot.sendMessage(chatId, `Assalomu alaykum ${msg.from?.first_name}`)
    }
    
})


bot.on("document", async msg => {
    const chatId = msg.chat.id
    const fileId = msg.document.file_id

    const filePath = await bot.downloadFile(fileId, "./files")

    const data = await mammoth.extractRawText({path: filePath })
    console.log(data.value)

    await fs.unlink(filePath)
    return bot.sendMessage(chatId, data.value.length )
    
})