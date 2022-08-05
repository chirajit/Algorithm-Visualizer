function fillcell (board, n, i, j)
{
	var hor, ver;
	if (board[i][j] == 0)
	{
		board[i][j] = 'Q';
		for (let row =0; row <n ; row++)
		{
			for (let col =0; col <n ; col++)
			{
				if (row == i && board[row][col] == 0)
					board[row][col] = 1;
				if (col == j && board[row][col] == 0)
					board[row][col] = 1;
				if ((row-i == col-j) && board[row][col] == 0)
					board[row][col] = 1;
				if ((row-i == (-1)*(col-j)) && board[row][col] == 0)
					board[row][col] = 1;
			}
		}
		return true;
	}
	else
		return false;
}

function nQueens(board, n,i, j , solSeq)
{
	if (i >=n)
	{
		solutions.push(solSeq.slice());
		return;
	}
	var len = solutions.length;
	var cpyboard = [];
	for (let ind =0; ind<n ; ind++)
		cpyboard[ind] = [...board[ind]];

	var valu ;
	valu = fillcell(cpyboard, n, i, j);
	if (valu)
	{
		solSeq.push(cpyboard);
		nQueens(cpyboard, n, i+1, 0, solSeq);
	}
	if (len < solutions.length)
		solSeq =[];
	if (valu)
		solSeq.push(board);
	if (j+1 < n)
		nQueens(board, n, i, j+1, solSeq);
}

function drawcell (colour, n, attack, queen, row, col)
{
	var cont = canv.getContext("2d");
	side = canv.width/n;
	rad = canv.width/(2*n);
	cont.linewidth = "2";
	cont.strokeStyle = "#000000";
	cont.fillStyle = colour;
	var startx = col*side;
	var starty = row*side;
	cont.fillRect(startx+2, starty+2, side-4, side-4);
	cont.strokeRect(startx, starty, side, side);
	if (queen)
	{
		const q = new Image();
		q.src = "queen.png";
		q.onload = function(){
			cont.drawImage(q, startx+2, starty+2, side-4, side-4);
		}
	}
	else if (attack)
	{
		const q = new Image();
		q.src = "redcross.png";
		q.onload = function(){
			cont.drawImage(q, startx+side/4, starty+side/4, side/2, side/2);
		}
	}
}
function drawboard (n, board)
{
	var color, attack = false, queen= false;
	for (let i = 0; i <n ; i++)
	{
		for (let j =0 ; j <n; j++)
		{
			queen= false; attack = false;
			if ((i+j)%2 == 0)
				color = "#B87526";
			else
				color = "#FFFFFF";
			if (board[i][j] == 'Q')
				queen = true;
			else if (board[i][j] == 1)
				attack =true;

			drawcell (color, n, attack, queen, i, j);
		}
	}
}
async function animate(n, solSeq)
{
	for (let i = 0; i < solSeq.length; i++)
	{
		await new Promise((resolve) =>
			setTimeout(() => {
				resolve();
			}, speed)
			);
		drawboard(n, solSeq[i]);
	}
	document.getElementById("solve").disabled = false;
	document.getElementById("NextSol").disabled = false;
}

function setSpeed()
{
	if (speed == 250)
	{
		speed = 2000;
		document.getElementById("speed").innerHTML = "Speed 1X";
	}
	else
	{
		speed = speed/2;
		document.getElementById("speed").innerHTML = "Speed " + (2000/speed) + "X";
	}
}

function nextSol()
{
	document.getElementById("NextSol").disabled = true;
	document.getElementById("solve").disabled = true;
	solutionNumber ++;
	if (solutionNumber >= solutions.length)
	{
		document.getElementById("check").innerHTML = "No more Solution Exixts !!";
	}
	else
	{
		canv.getContext("2d").clearRect(0,0,canv.width,canv.height);
		animate (n, solutions[solutionNumber]);
	}
}

function solveNqueens () 
{
	solutionNumber = 0;
	solutions = [];
	document.getElementById("solve").disabled = true;
	var strn = document.getElementById("input").value;
	n = parseInt(strn);
	canv.getContext("2d").clearRect(0,0,canv.width,canv.height);
	if (n > 0 && n <= 8)
	{
		document.getElementById("check").innerHTML ="";
		var board = [];
		for (let i =0; i<n ; i++)
			board.push(Array(n).fill(0));
		drawboard(n,board);
		nQueens(board, n, 0, 0, [], solutions);
		if (solutions.length >0 )
		{
			animate (n, solutions[solutionNumber]);
		}
		else{
			document.getElementById("check").innerHTML ="No Solution exists !";
			document.getElementById("solve").disabled = false;
		}
	}
	else
	{
		document.getElementById("check").innerHTML = "Please Enter a valid Integer in range [1,8] !!!";
		document.getElementById("solve").disabled = false;
	}
}

var speed = 2000;
var solutions = [];
var solutionNumber = 0;
var canv = document.getElementById("chessboard");
var n;
