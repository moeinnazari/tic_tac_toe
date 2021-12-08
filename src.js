let btn1=document.querySelector('.button1');
let btn2=document.querySelector('.button2');
let boundary=document.querySelector('.boundary');
let pcIsOn=false;
btn1.addEventListener("click",()=>{
	boundary.style.display="none"
	btn1.style.display="none"
    btn2.style.display="none"
    pcIsOn=true;
})
btn2.addEventListener("click",()=>{
	boundary.style.display="none"
	btn1.style.display="none"
    btn2.style.display="none"
    
})


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
let filterarray
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
       if(!pcIsOn) {
       	result.textContent=xIsNext?"term of X" :"term of O"
        }
        finishGame(array,index) //after every click on card check game is finsih or continue or equal
        if(pcIsOn){
        	filterarray=findall(array,null)
        	if(gameOver || filterarray.length==0){
        		return
        	}
        	else{
        	if(!xIsNext && !checkwin(array)){
        		
          	 let indexPc=choicePc()
          	 cards[indexPc].textContent=xIsNext?'X':'O'
	 	     xIsNext=!xIsNext
	 	     array[indexPc]='O'
	 	     filterarray=findall(array,null)
	 	     finishGame(array,indexPc)	
        	}
          	}
          }
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
  return null
}
//clear all array and cards
const resetGame=()=>{
	array.fill(null)
	cards.forEach((card)=>{
		card.textContent=""

	})
	xIsNext=true

}
const choicePc=()=>{
	
	 if(array[0]==='O' && array[0]===array[1] && !array[2]) {
		return 2
	}
	else if(array[1]==='O' && array[1]===array[2] && !array[0]){
		return 0
	}
	else if(array[2]==='O' && array[2]===array[0] && !array[1]){
		return 1
	}
	else if(array[3]==='O' && array[3]===array[4] && !array[5]){
		return 5
	}
	else if(array[4]==='O' && array[4]===array[5] && !array[3]){
		return 3
	}
	else if(array[3]==='O' && array[3]===array[5] && !array[4]){
		return 4
	}
	else if(array[6]==='O' && array[6]===array[7] && !array[8]){
		return 8
	}
	else if(array[6]==='O' && array[6]===array[8] && !array[7]){
		return 7
	}
	else if(array[7]==='O' && array[7]===array[8] && !array[6]){
		return 6
	}
	else if(array[0]==='O' && array[0]===array[3] && !array[6]){
		return 6
	}
	else if(array[0]==='O' && array[0]===array[6] && !array[3]){
		return 3
	}
	else if(array[3]==='O' && array[3]===array[6] && !array[0]){
		return 0
	}
	else if(array[1]==='O' && array[1]===array[4] && !array[7]){
		return 7
	}
	else if(array[1]==='O' && array[1]===array[7] && !array[4]){
		return 4
	}
	else if(array[4]==='O' && array[4]===array[7] && !array[1]){
		return 1
	}
	else if(array[2]==='O' && array[2]===array[5] && !array[8]){
		return 8
	}
	else if(array[2]==='O' && array[2]===array[8] && !array[5]){
		return 5
	}
	else if(array[5]==='O' && array[5]===array[8] && !array[2]){
		return 2
	}
	else if(array[0]==='O' && array[0]===array[4] && !array[8]){
		return 8
	}
	else if(array[0]==='O' && array[0]===array[8] && !array[4]){
		return 4
	}
	else if(array[4]==='O' && array[4]===array[8] && !array[0]){
		return 0
	}
	else if(array[2]==='O' && array[2]===array[4] && !array[6]){
		return 6
	}
	else if(array[2]==='O' && array[2]===array[6] && !array[4]){
		return 4
	}
	else if(array[4]==='O' && array[4]===array[6] && !array[2]){
		return 2
	}
	else if(array[0]==='X' && array[0]===array[1] && !array[2]) {
		return 2
	}
	else if(array[1]==='X' && array[1]===array[2] && !array[0]){
		return 0
	}
	else if(array[2]==='X' && array[2]===array[0] && !array[1]){
		return 1
	}
	else if(array[3]==='X' && array[3]===array[4] && !array[5]){
		return 5
	}
	else if(array[4]==='X' && array[4]===array[5] && !array[3]){
		return 3
	}
	else if(array[3]==='X' && array[3]===array[5] && !array[4]){
		return 4
	}
	else if(array[6]==='X' && array[6]===array[7] && !array[8]){
		return 8
	}
	else if(array[6]==='X' && array[6]===array[8] && !array[7]){
		return 7
	}
	else if(array[7]==='X' && array[7]===array[8] && !array[6]){
		return 6
	}
	else if(array[0]==='X' && array[0]===array[3] && !array[6]){
		return 6
	}
	else if(array[0]==='X' && array[0]===array[6] && !array[3]){
		return 3
	}
	else if(array[3]==='X' && array[3]===array[6] && !array[0]){
		return 0
	}
	else if(array[1]==='X' && array[1]===array[4] && !array[7]){
		return 7
	}
	else if(array[1]==='X' && array[1]===array[7] && !array[4]){
		return 4
	}
	else if(array[4]==='X' && array[4]===array[7] && !array[1]){
		return 1
	}
	else if(array[2]==='X' && array[2]===array[5] && !array[8]){
		return 8
	}
	else if(array[2]==='X' && array[2]===array[8] && !array[5]){
		return 5
	}
	else if(array[5]==='X' && array[5]===array[8] && !array[2]){
		return 2
	}
	else if(array[0]==='X' && array[0]===array[4] && !array[8]){
		return 8
	}
	else if(array[0]==='X' && array[0]===array[8] && !array[4]){
		return 4
	}
	else if(array[4]==='X' && array[4]===array[8] && !array[0]){
		return 0
	}
	else if(array[2]==='X' && array[2]===array[4] && !array[6]){
		return 6
	}
	else if(array[2]==='X' && array[2]===array[6] && !array[4]){
		return 4
	}
	else if(array[4]==='X' && array[4]===array[6] && !array[2]){
		return 2
	}
	else{
		
			if(!array[4]){
				return 4
			}
			const randnum=Math.floor(Math.random()*filterarray.length)
			if(!array[filterarray[randnum]]){
				return filterarray[randnum]
			}
		
		
	}

}
//find all null item in array
const findall=(a,x)=>{
	let result=[]
	let len=a.length
	let pos=0
	while(pos<len){
		pos=a.indexOf(x,pos)
		if(pos==-1){break}
			result.push(pos)
		pos=pos+1
	}
	return result
}