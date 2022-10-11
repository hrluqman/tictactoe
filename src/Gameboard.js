import { useEffect, useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";

const Gameboard = () => {

    const [turn, setTurn] = useState('X');
    const [status, setStatus] = useState('');
    const [Xplayer, setXplayer] = useState([]);
    const [Oplayer, setOplayer] = useState([]);
    const [clear, setClear] = useState(0);
    const [board, setBoard] = useState(["","","","","","","","",""]);
    const [winstate, setWinstate] = useState(["","","","","","","","",""]);
    const winCombos = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

    const XO = (id, target) => {
        if(!status.includes("Game over.")) {
            if(board[id-1]!=="") {
                target.setAttribute("wobble", "1");
                setTimeout(() => {target.removeAttribute('wobble');}, 500);
            }
            else {
                board[id-1] = turn;
                if(turn === 'X') {
                    Xplayer.push(Number(id));
                    setXplayer(Xplayer);
                }
                else {
                    Oplayer.push(Number(id));
                    setOplayer(Oplayer);
                }
                setTurn(turn === 'X' ? 'O' : 'X');
            }
        }
    }

    const checker = (arr, target) => target.every(v => arr.includes(v));

    useEffect(()=> {
        var winBox;
        var gameOver;
        setBoard(board);
        board.includes("") ? setStatus(`Player ${turn} Turn`) : setStatus('Game over.');
        for(let [index, win] of winCombos.entries()) {
            if(checker(Xplayer, win)===true) {
                gameOver = false;
                gameOver ? setStatus(`Player ${turn} Turn`) : setStatus(`Game over. Player X won.`);
                winBox = win;
            }
            else if(checker(Oplayer, win)===true) {
                gameOver = false;
                gameOver ? setStatus(`Player ${turn} Turn`) : setStatus(`Game over. Player O won.`);
                winBox = win;
            }
        }
        for(var w in winBox) {
            winstate[(winBox[w]-1)] = 1;
        }
        setWinstate(winstate);
    },[turn])

    const refreshGame = () => {
        setClear(1);
        setTimeout(() => {
            setBoard(["","","","","","","","",""]);
            setWinstate(["","","","","","","","",""]);
            setStatus('Player X Turn');
            setXplayer([]);
            setOplayer([]);
            setTurn('X');
            setClear(0);
        }, 200);
    }

    return (
        <div className="game-container">
            <h1 className="title">Tic Tac Toe</h1>

            <table className="board-container">
                <tbody>
                    <tr>
                        <td className="cell"><div className="cell-box" id="1" win={winstate[0]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[0]}</span></div></td>
                        <td className="cell"><div className="cell-box" id="2" win={winstate[1]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[1]}</span></div></td>
                        <td className="cell"><div className="cell-box" id="3" win={winstate[2]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[2]}</span></div></td>
                    </tr>
                    <tr>
                        <td className="cell"><div className="cell-box" id="4" win={winstate[3]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[3]}</span></div></td>
                        <td className="cell"><div className="cell-box" id="5" win={winstate[4]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[4]}</span></div></td>
                        <td className="cell"><div className="cell-box" id="6" win={winstate[5]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[5]}</span></div></td>
                    </tr>
                    <tr>
                        <td className="cell"><div className="cell-box" id="7" win={winstate[6]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[6]}</span></div></td>
                        <td className="cell"><div className="cell-box" id="8" win={winstate[7]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[7]}</span></div></td>
                        <td className="cell"><div className="cell-box" id="9" win={winstate[8]} onClick={(e)=>{XO(e.target.id, e.target)}}><span clear={clear}>{board[8]}</span></div></td>
                    </tr>
                </tbody>
            </table>
            <div className="icon-container">
                <MdOutlineRefresh className="icon" onClick={refreshGame} />
            </div>
            <h2 className="status">{status}</h2>
            <p className="creator">By hrluqman</p>
        </div>
    );
}
 
export default Gameboard;