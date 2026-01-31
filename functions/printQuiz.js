
const time = 5
let tIndex = 0
let res = 0
const printQuiz = async (bot, chatId, tests) =>{

    const t = tests[0]
    await bot.sendPoll(chatId, t[tIndex].question, t[tIndex].option, {
        type: "quiz",
        correct_option_id: t[tIndex].correctId,
        is_anonymous: false
    })


    if( t.length == tIndex){

        clearTimeout(setTimeOutId)
        return bot.sendMessage(chatId, "Siz quizni yakunladingiz! ")
    }
    


    const setTimeOutId = setTimeout( () => {
        tIndex++
        printQuiz(bot, chatId, tests )
    }, 1000 * time )

}



await bot.on("poll_answer", async ans => {
    const [ quizId ] = ans.option_ids
    console.log( quizId )
    console.log( ans )
})

module.exports = printQuiz