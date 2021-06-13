let solnTileList = document.querySelectorAll(".stile");
let gmTileList = document.querySelectorAll(".gtile");
let stBtn = document.getElementById("StartGame");
let gmGrid = document.querySelector(".GameGrid");
let score = document.getElementById("mvnum");
let hour, minute, seconds, totalSeconds;
let count = 0;
let canStart=0;
let timerVar;
let reset=0;




// Giving each tile in the solution and game grid (except empty element), an ID.
let giveSolnGridID = () =>
{
    solnTileList.forEach((item,i) => 
    {
      item.id="s"+i;
    });
}

let timer = () =>
{
  clearInterval (timerVar);
  timerVar = setInterval(countTimer, 1000);
  totalSeconds = 0;
  function countTimer()
  {
    ++totalSeconds;
    hour = Math.floor(totalSeconds / 3600);
    minute = Math.floor((totalSeconds-hour*3600)/60);
    seconds = totalSeconds - (hour*360 + minute*60);
    document.getElementById("timer").innerText=hour+":"+ minute+":" + seconds;
  }
}
// Color both the grids when start button is clicked.
let colorGrid=()=>{
  stBtn.addEventListener('click', function(){
    count = 0;
    canStart=1;
    score.innerText=0;
    if(reset==0)
    {
      stBtn.innerHTML="Reset";
      reset=1;
    }
    timer();
    for(let i=0;i<24;i++)
    {
       let newCol = genRandomColor();
       if(i<9)
       {
            gmTileList[i].style.background=newCol;
            solnTileList[i].style.background=newCol;
       }
       else
       {
            gmTileList[i].style.background=newCol;
       }
            
    }
    for(let i=0;i<25;i++)
    {
      let r1 = getRandomInt(23);
      let r2= getRandomInt(23);
        let c1 = gmTileList[r1].style.background;
        gmTileList[r1].style.background=gmTileList[r2].style.background;
        gmTileList[r2].style.background=c1;
    }
    gmTileList[24].style.background="";
  })  
}

let giveGameGridID = () =>
{
    for(let i=0;i<24;i++)  
      gmTileList[i].id="g"+i;
}


// Function for generating random integers upto specified max limit.
let getRandomInt = (max) =>
{
    return(Math.floor(Math.random()*max))
}


// Function for generating random colors.
let genRandomColor = () =>
{
    let colList = ["#0000FF","#FF0000","#FFFF00","#00FF00","#FF6600","#FC466A"]
    let color=colList[getRandomInt(6)];
    return color;
}


//Convert statepos to dimpos.
let convertStateToDim=(statePos)=>{

  let row = Math.ceil((statePos+1)/5);
  let column = 5-((5*row) - (statePos+1));
  console.log(row-1, column-1);
  return [row-1, column-1];

}


// Gives a 1D array of the state of the game.
const getState = (items) => {
  const content = [];
  items.forEach((item, i) => {
      content.push(item.style.background);
  });
  return content;
}


// Gives a 2D array of the state of the state of the game.
const getDimension = (state) => 
{
    var x = new Array(5);
    let k = 0
    for (let i = 0; i < 5; i++) 
      {
  
         x[i]=new Array(5);
         for(let j=0; j<5; j++)
          {
             x[i][j]=state[k];
             k++;
          }
      }
  return x;
}


// Returns the position of the empty tile.
let getEmptyTilePosDim = () =>
{
    let curState = getState(gmTileList);
    let curDim = getDimension(curState);
    for(i = 0; i<5; i++)
    {
      for(let j=0;j<5;j++)
      {
        if(curDim[i][j]=="")
          return [i,j];
      }
    }
}

// Returns index of empty tile in state (1D) array.
let getEmptyTilePosState=()=>
{
  let state = getState(gmTileList);
  for(let i =0;i<25;i++)
  { 
    if(state[i]=="")
     return i;
  }

}
// do keyboad if not work with mouse.
// get id of clicked til ,, write ifsurroundfunction anget empy tile pos // swa clors and update state and dimensions.

let checkForEmpty = (dimPos, statePos ) =>{
   
  
  let row=dimPos[0];
  let column=dimPos[1];
  let dim = getDimension(getState(gmTileList));
  if(row==4)
  {
    if(dim[row][column-1]=="")
      {
        //Statepos is pos of clicked tile in state array
        let col = gmTileList[statePos].style.background;
        //ePos i pos of emptytile in state
        let ePos = getEmptyTilePosState();
        gmTileList[ePos].style.background=col;
        gmTileList[statePos].style.background="";
        count++;
        score.innerText=count;
      }

    if(dim[row][column+1]=="") 
      {
        //Statepos is pos of clicked tile in state array
        let col = gmTileList[statePos].style.background;
        //ePos i pos of emptytile in state
        let ePos = getEmptyTilePosState();
        gmTileList[ePos].style.background=col;
        gmTileList[statePos].style.background="";
        count++;
        score.innerText=count;
      } 
    if(dim[row-1][column]=="")
      {
        //Statepos is pos of clicked tile in state array
        let col = gmTileList[statePos].style.background;
        //ePos i pos of emptytile in state
        let ePos = getEmptyTilePosState();
        gmTileList[ePos].style.background=col;
        gmTileList[statePos].style.background="";
        count++;
        score.innerText=count;
      }
  }

  else if(row==0)
  {
    if(dim[row][column+1]=="")
    {
      //Statepos is pos of clicked tile in state array
      let col = gmTileList[statePos].style.background;
      //ePos i pos of emptytile in state
      let ePos = getEmptyTilePosState();
      gmTileList[ePos].style.background=col;
      gmTileList[statePos].style.background="";
      count++;
      score.innerText=count;
    }
    if(dim[row][column-1]=="")
    {
      //Statepos is pos of clicked tile in state array
      let col = gmTileList[statePos].style.background;
      //ePos i pos of emptytile in state
      let ePos = getEmptyTilePosState();
      gmTileList[ePos].style.background=col;
      gmTileList[statePos].style.background="";  
      count++;
      score.innerText=count;
    }
    if(dim[row+1][column  ]=="")
    {
      //Statepos is pos of clicked tile in state array
      let col = gmTileList[statePos].style.background;
      //ePos i pos of emptytile in state
      let ePos = getEmptyTilePosState();
      gmTileList[ePos].style.background=col;
      gmTileList[statePos].style.background="";
      count++;
      score.innerText=count;
    }
  }

  else 
  {
    if(dim[row][column-1]=="")
    {
      //Statepos is pos of clicked tile in state array
      let col = gmTileList[statePos].style.background;
      //ePos i pos of emptytile in state
      let ePos = getEmptyTilePosState();
      gmTileList[ePos].style.background=col;
      gmTileList[statePos].style.background="";
      count++;
      score.innerText=count;
    }

    if(dim[row][column+1]=="") 
      {
        //Statepos is pos of clicked tile in state array
        let col = gmTileList[statePos].style.background;
        //ePos i pos of emptytile in state
        let ePos = getEmptyTilePosState();
        gmTileList[ePos].style.background=col;
        gmTileList[statePos].style.background="";
        count++;
        score.innerText=count;
      } 
    
    
    if(dim[row-1][column]=="")
      {
        //Statepos is pos of clicked tile in state array
        let col = gmTileList[statePos].style.background;
        //ePos i pos of emptytile in state
        let ePos = getEmptyTilePosState();
        gmTileList[ePos].style.background=col;
        gmTileList[statePos].style.background="";
        count++;
        score.innerText=count;
      }

    if(dim[row+1][column]=="")
      {
        //Statepos is pos of clicked tile in state array
        let col = gmTileList[statePos].style.background;
        //ePos i pos of emptytile in state
        let ePos = getEmptyTilePosState();
        gmTileList[ePos].style.background=col;
        gmTileList[statePos].style.background="";
        count++;
        score.innerText=count;
      }
  } 
 
}


let hasWon = () =>
{
    let soln = getState(solnTileList);
    let state = getState(gmTileList);
    let gameState = [];
    for(let i = 6; i<17;i+=5)
    {
      gameState.push(state[i], state[i+1], state[i+2]);
    }
    for(let i = 0;i<soln.length ;i++)
    {
      if(soln[i]!=gameState[i])
        {
          return 0;
        }
    }
    return 1;
}

//  ************************************************************************** //

giveGameGridID();
colorGrid();


  gmTileList.forEach(tile => 
    {
  
      tile.addEventListener('click', ()=>
      {
        let k = tile.id; 
        console.log(k);
        for(i=0;i<25;i++)
        {
          if(gmTileList[i].id==k)
             {
                let statePos=i;
                console.log(statePos);
                let arr = convertStateToDim(statePos);
                console.log(arr);
                if(canStart==1)
                 checkForEmpty(arr,statePos);
                if(hasWon()==1&&canStart==1)
                    {     
                      clearInterval(timerVar);            
                      alert("Moves - "+count+"\nTime taken - "+hour+":"+minute+":"+seconds);
                      window.open('congrats.html','_blank');
                    }
             }
        }
    
      })
    }
  );

// Pop-up
// TImer