
const TelegramBot = require("node-telegram-bot-api")
const fs = require("fs/promises")
const mammoth = require("mammoth")
const { type } = require("os")
require("dotenv").config()

if( !process.env.BOT_TOKEN ){
	console.log("Env faylda bot token topilmadi! ")
	return
}

const bot = new TelegramBot( process.env.BOT_TOKEN, {polling: true} )
const obj = {}
let lastNum = null

const bootstrap = () =>{
	
	bot.on("message", async msg => {
		const chatId = msg.chat.id
		const text = msg.text

		if( text == "/start"){
			return bot.sendMessage(chatId, `Assalomu alaykum ${msg.from?.first_name}`)
		}

		if( text == "/quiz"){


			await bot.sendPoll(chatId, obj.test1[0], [
					obj[`test1`][1],
					obj[`test1`][2],
					obj[`test1`][3],
					obj[`test1`][4]
				], {
					type: "quiz",
					correct_option_id: 1
				})

			// for( let i = 1; i <= lastNum; i++){

			// 	await bot.sendPoll(chatId, obj[`test${i}`][0], [
			// 		obj[`test${i}`][1],
			// 		obj[`test${i}`][2],
			// 		obj[`test${i}`][3],
			// 		obj[`test${i}`][4]
			// 	], {
			// 		type: "quiz",
			// 		correct_option_id: 1
			// 	})


			// }
		}
		
	})


	bot.setMyCommands([
		{
			command: "/start",
			description: "Botni ishga tushirish"
		},
		{
			command: "/info",
			description: "Botdan foydalanish haqida ma'lumot"
		},
		{
			command: "/help",
			description: "Botda bor comandalar haqida ma'lumot"
		}
	])


	bot.on("document", async msg => {
		const chatId = msg.chat.id
		const fileId = msg.document.file_id

		const filePath = await bot.downloadFile(fileId, "./files")

		const res = await mammoth.extractRawText({path: filePath })
		
		const data = res.value
		// console.log(data)
		parseQuiz(data)
		await fs.unlink(filePath)
		return bot.sendMessage(chatId, data.length )
		
	})
}

bootstrap()


function parseQuiz(data) {

	const bloks = data.split("++++++").map( b => b.trim()).filter( b => b != "")

   if( bloks[0].length >= 900 ){
		bloks.shift()
   }

   let num = 1
   for( const t of bloks ){
		const el = t.split("======").map( b => b.trim() ).filter( b => b != "")
		const name = `test${num}`
		obj[name] = el
		num++
   }

   console.log(obj.test1[0])
   
   lastNum = Object.values(obj).length
}