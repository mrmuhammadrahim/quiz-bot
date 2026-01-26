
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


module.exports = parseQuiz