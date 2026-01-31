
const TelegramBot = require("node-telegram-bot-api")
const fs = require("fs/promises")
const mammoth = require("mammoth")
const parseQuiz = require("./functions/parserFile.js")
const myBotCommands = require("./functions/myBotCommands.js")
const printQuiz = require("./functions/printQuiz.js")
require("dotenv").config()



if( !process.env.BOT_TOKEN ){
	console.log("Env faylda bot token topilmadi! ")
	return
}




const bot = new TelegramBot( process.env.BOT_TOKEN, {polling: true} )




const bootstrap = () =>{
	
	bot.setMyCommands(myBotCommands)

	bot.on("message", async msg => {
		const chatId = msg.chat.id
		const text = msg.text

		if( text == "/start"){
			return bot.sendMessage(chatId, `Assalomu alaykum ${msg.from?.first_name}`)
		}

		if( text == "/quizzes"){
			return bot.sendMessage(chatId, "Sizda hozircha hech qanday quizlar yo'q")
		}

		if( text == "/new_quiz"){
			return bot.sendMessage(chatId, "Siz yangi quiz test tuzmochimisiz")
		}
		
	})


	

	bot.on("document", async msg => {
		const chatId = msg.chat.id
		const fileId = msg.document.file_id

		const filePath = await bot.downloadFile(fileId, "./files")

		const res = await mammoth.extractRawText({path: filePath })
		
		const data = res.value
	
		await fs.unlink(filePath)
		const tests = parseQuiz(data)

		const botAndChatId = {
			bot,
			chatId
		}
		module.exports = botAndChatId
		await printQuiz(tests)
		return bot.sendMessage(chatId, data.length )
		
	})
}


bootstrap()




