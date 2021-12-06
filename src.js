let root=document.querySelector('#root');
let grid=document.createElement("div");
grid.classList.add('grid')


//show result at end of game
let result=document.createElement("div");
result.classList.add('result')
//show  score X and O after end game
let score=document.createElement('div');
score.classList.add('result')

let showScoreX=document.createElement('div');
showScoreX.classList.add('result')
let showScoreO=document.createElement('div');
showScoreO.classList.add('result')
showScoreX.textContent="X :"
showScoreO.textContent="O :"


score.appendChild(showScoreX)
score.appendChild(showScoreO)

root.appendChild(result)
root.appendChild(grid)
root.appendChild(score)

//a boolean for change term of X and O
let xIsNext=true
let array=Array(9).fill(null)
let gameOver=false //when gameOver is true ,game ended
let cardOne,cardTwo,cardThree  //for save card of winners
let scoreO=0,scoreX=0
//create and show cards 
for(let i=0;i<9;i++){
	let card=document.createElement("div");
	card.classList.add('card')
   card.dataset.index=i
	grid.appendChild(card)


	


}
//create a array of cards created
let cards=document.querySelectorAll('.card');
cards.forEach((card,i)=>{
   
   card.addEventListener('click',function(e){
		//if card choiced or gameOver is true not happend
		if(gameOver || card.textContent){		
		   return
		}
		card.textContent=xIsNext?'X':'O'
		xIsNext=!xIsNext
		let index=e.target.dataset.index //get data-index
        array[index]=card.textContent
        finishGame(array,index) //after every click on card check game is finsih or continue or equal
	})
})
const finishGame=(array,index)=>{
	 
	 if(checkwin(array)){

				gameOver=false
				result.textContent="winner is "+array[index]
				
				cards[cardOne].classList.add('green')
				cards[cardTwo].classList.add('green')
				cards[cardThree].classList.add('green')
				
				if(array[index]=='X'){
					scoreX++
				}
				else{
					scoreO++
				}

				showScoreX.textContent="X :"+scoreX
                showScoreO.textContent="O :"+scoreO

				setTimeout(()=>{
					result.textContent=""
					cards[cardOne].classList.remove('green')
				cards[cardTwo].classList.remove('green')
				cards[cardThree].classList.remove('green')
				},3000);

				setTimeout(resetGame,3000)//after 3seconds game is reseted
				return 
	}
	else{
		for(let i=0;i<array.length;i++){
			if(!array[i]){return}
		}
	   result.textContent="equal"
	   setTimeout(()=>{result.textContent=""},3000);
	   setTimeout(resetGame,3000)
	}
}
//check if we have winner gameOver will be true
const checkwin=(array)=>{
	const arr=[
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[2,4,6],
			[0,4,8]
	]

	for(let i=0;i<arr.length;i++){
		const [a,b,c]=arr[i]
	    
			
			if(array[a] && array[a]===array[b] && array[b]===array[c]){
				cardOne=a
				cardTwo=b
				cardThree=c
	                return array[a]
			}
	}

}
//clear all array and cards
const resetGame=()=>{
	array.fill(null)
	cards.forEach((card)=>{
		card.textContent=""

	})

}