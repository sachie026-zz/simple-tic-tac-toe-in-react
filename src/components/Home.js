import React, { useState } from 'react';

const PLAYERS = ['X', 'O'];

const Home = () => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [totalMoves, setTotalMoves] = useState(0);
  const [winnerPlayer, setWinnerPlayer] = useState(null);
  const [mArray, setMArray] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const checkDiagonally = () => {
    const currentPlayer = PLAYERS[currentPlayerIndex];
    if (
      (mArray[0][0] === currentPlayer &&
        mArray[1][1] === currentPlayer &&
        mArray[2][2] === currentPlayer) ||
      (mArray[0][2] === currentPlayer &&
        mArray[1][1] === currentPlayer &&
        mArray[2][0] === currentPlayer)
    ) {
      setWinnerPlayer(currentPlayer);
    }
  };

  const checkVertically = () => {
    const currentPlayer = PLAYERS[currentPlayerIndex];
    let columncounter = 0;
    mArray.forEach((rvalue, rindex) => {
      rvalue.forEach((cvalue, cindex) => {
        if (mArray[cindex][rindex] === currentPlayer) {
          columncounter++;
        }
        if (columncounter === 3) {
          setWinnerPlayer(currentPlayer);
        }
      });
      columncounter = 0;
    });
    return false;
  };

  const checkHorizontally = () => {
    const currentPlayer = PLAYERS[currentPlayerIndex];
    let rowcounter = 0;
    mArray.forEach((rvalue, rindex) => {
      rvalue.forEach((cvalue, cindex) => {
        if (cvalue === currentPlayer) {
          rowcounter++;
        }
        if (rowcounter === 3) {
          setWinnerPlayer(currentPlayer);
        }
      });
      rowcounter = 0;
    });

    return false;
  };

  const checkForWinner = () => {
    checkDiagonally();
    if (!winnerPlayer) {
      checkHorizontally();
    }
    if (!winnerPlayer) {
      checkVertically();
    }
  };

  const togglePlayers = () => {
    setCurrentPlayerIndex(currentPlayerIndex === 1 ? 0 : 1);
  };

  const onCellClick = (rowIndex, columnIndex) => {
    const tempArray = mArray;
    tempArray[rowIndex][columnIndex] = PLAYERS[currentPlayerIndex];
    setMArray(tempArray);
    if (totalMoves >= 4) {
      checkForWinner();
    }
    togglePlayers();
    setTotalMoves(totalMoves + 1);
  };

  return (
    <div className="container">
      <div>Winner : {winnerPlayer}</div>
      {mArray.map((rowArray, rindex) => {
        return (
          <div className="row" key={`row-${rindex}`}>
            {rowArray.map((item, cindex) => {
              return (
                <div
                  className="cell"
                  onClick={() => onCellClick(rindex, cindex)}
                  key={`cellkey-${rindex}-${cindex}`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
