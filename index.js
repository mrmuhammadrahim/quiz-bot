
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

    if( text == "/quiz"){
        return bot.sendPoll(chatId, "Node.js nima?", [
            "Frontend framework",
            "Backend runtime",
            "Database",
            "OS"
        ], {
            type: "quiz",
            correct_option_id: 1
        })
    }
    
})


bot.on("document", async msg => {
    const chatId = msg.chat.id
    const fileId = msg.document.file_id

    const filePath = await bot.downloadFile(fileId, "./files")

    const res = await mammoth.extractRawText({path: filePath })
    
    const data = res.value

    await fs.unlink(filePath)
    return bot.sendMessage(chatId, data.length )
    
})