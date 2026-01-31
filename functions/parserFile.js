
function parseQuiz(data) {

   const testContainer = []
   let testBlok = []
   
	const bloks = data.split(/\+{3,}/).map( b => b.trim() ).filter( b => b != "")

   if( bloks[0].length >= 900 ){
		bloks.shift()
   }

   let num = 0
   for( const t of bloks ){
		const el = t.split(/\={3,}/).map( b => b.trim() ).filter( b => b != "")
      const testBody = {}
		const tquestion = el.shift()
      testBody.question = tquestion.length >= 300 ? tquestion.slice( 0, 297 ) + "..." : tquestion

      testBody.option = el.map( (str, ind ) => {
         if( str.startsWith("#") ){
            testBody.correctId = ind

            str = str.replace( /^#/, "")
         }

         return str.length >=100 ? str.slice(0, 97) + "..." : str
      })
      
      testBlok.push(testBody)
      num++


      if( num == 25 ){
         testContainer.push(testBlok)
         testBlok = []
         num = 0
      }
      
   }

   if( testBlok.length > 0 ){
      if( testBlok.length >= 15 ){
         testContainer.push( testBlok )

         return testContainer
      }

      testContainer[testContainer.length - 1].push(...testBlok)
   }



   return testContainer
}


module.exports = parseQuiz