import styled from "styled-components";
import Information from "./components/Information";
import NineSquares from "./components/Squares/NineSquares";
import RestartButton from "./components/RestartButton";
import { useEffect, useState } from "react";
import { WINNER_STEPS_LIST } from "./constants";
import SwitchMode from "./components/SwitchMode";

const TicTacTocStyle = styled.div`
  /* *表示每個元素都帶上，只是輔助線 */
  /* * {
    border: 1px solid black;
    padding: 4px;
  } */
  /* container在背景置中 */
  background: ${(props) => props.theme.background};
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
  /* 給元件之間一些間距*/
  .container {
    display: flex;
    flex-direction: column;
    & > *:not(:first-of-type) {
      margin-top: 4px;
    }
  }
  .actions {
    & > *:not(:first-of-type) {
      margin-top: 4px;
    }
  }
`;
const PLAYERS = [1, -1];
const defaultUsersSteps = {
  [1]: [],
  [-1]: [],
};
function TicTacToc() {
  // TODO:設定資料結構
  const [currentPlayerId, setCurrentPlayerId] = useState(PLAYERS[0]);
  const [playerStepsMap, setPlayerStepMap] = useState(defaultUsersSteps);
  const [isSinglePlay, setIsSinglePlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [judgmentInfo, setJudgmentInfo] = useState({
    winnerId: 0,
    winnerStepsList: [],
    lastStepsToWin: {},
  });
  const { winnerId, winnerStepsList, lastStepsToWin } = judgmentInfo;

  const handleClickSquare = (squareId) => {
    // 如果在loading的話，表示電腦還在下，玩家就不能進行下棋的動作
    if (isLoading) {
      return;
    }
    const isSquareDisable =
      playerStepsMap[PLAYERS[0]].includes(squareId) ||
      playerStepsMap[PLAYERS[1]].includes(squareId);
    if (!isSquareDisable && !hasWinner) {
      const nextPlayerStepMap = {
        ...playerStepsMap,
        [currentPlayerId]: [...playerStepsMap[currentPlayerId], squareId],
      };
      setPlayerStepMap(nextPlayerStepMap);
      setJudgmentInfo(getJudgment(nextPlayerStepMap));
      setCurrentPlayerId((prev) => prev * -1);
    }
  };

  const getJudgment = (playerStepsMap) => {
    let lastStepsToWin = { ...defaultUsersSteps };
    const playerIds = Object.keys(playerStepsMap).map((playerId) => Number(playerId));
    let winnerId = 0;
    let winnerStepsList = [];
    playerIds.forEach((playerId) => {
      const userSteps = playerStepsMap[playerId];
      const remainingStepList = WINNER_STEPS_LIST.map((steps) =>
        steps.filter((step) => userSteps.indexOf(step) === -1)
      ); //跟獲勝路線裡的位置一一對照，獲勝路線裡還沒被填滿的就回傳
      const foundWinner =
        remainingStepList.filter((steps, index) => {
          if (steps.length === 1) {
            lastStepsToWin[playerId] = [...lastStepsToWin[playerId], ...steps];
          }
          if (steps.length === 0) {
            winnerStepsList = [...winnerStepsList, WINNER_STEPS_LIST[index]];
            return true;
          } else {
            return false;
          }
        }).length > 0;
      //Q 後面還接.length>0??
      if (foundWinner) {
        winnerId = playerId;
      }
    });
    return {
      winnerId,
      winnerStepsList,
      lastStepsToWin,
    };
  };
  const winnerSteps = winnerStepsList.flatMap((steps) => steps);
  const hasWinner = winnerId;

  const handleResetAllState = () => {
    setCurrentPlayerId(PLAYERS[0]);
    setPlayerStepMap(defaultUsersSteps);
    setJudgmentInfo({ winnerId: 0, winnerStepsList: [] });
  };

  const handleSwitchMode = () => {
    setIsSinglePlay((prev) => !prev);
  };

  // 找出還可以下棋的格子
  const getIsBlockEnable = (blockId) => {
    const allDisabledBlockIds = PLAYERS.flatMap((playerId) => playerStepsMap[playerId]);
    const isBlockEnable = allDisabledBlockIds.indexOf(blockId) === -1;
    return isBlockEnable;
  };

  const selectBlockId = ({ lastStepsToWin, getIsBlockEnable }) => {
    // Q這塊邏輯不懂
    const attackList = lastStepsToWin[-1];
    const protectList = lastStepsToWin[1];
    const stepToAttack = attackList.filter((blockId) => getIsBlockEnable(blockId));
    const stepToProtect = protectList.filter((blockId) => getIsBlockEnable(blockId));
    if (stepToAttack.length > 0) {
      return stepToAttack[0];
    }
    if (stepToProtect.length > 0) {
      return stepToProtect[0];
    }
    let blockId = 4;
    while (!getIsBlockEnable(blockId)) {
      blockId = Math.floor(Math.random() * 9);
    }
    return blockId;
  };

  useEffect(() => {
    if (isSinglePlay && currentPlayerId === -1 && !isGameEndedInTie) {
      setIsLoading(true);
      const blockId = selectBlockId({ lastStepsToWin, getIsBlockEnable });
      setTimeout(() => {
        setIsLoading(false);
        handleClickSquare(blockId);
      }, 1000);
    }
  }, [currentPlayerId, isSinglePlay]);

  const isGameEndedInTie = PLAYERS.flatMap((playerId) => playerStepsMap[playerId]).length === 9;
  // Q為何不能只用map就好?

  // TODO:元件分割
  return (
    <TicTacTocStyle className="background">
      <div className="container">
        <Information
          currentPlayerId={currentPlayerId}
          winnerId={winnerId}
          isGameEndedInTie={isGameEndedInTie}
        />
        <NineSquares
          playerStepsMap={playerStepsMap}
          winnerSteps={winnerSteps}
          handleClickSquare={handleClickSquare}
          currentPlayerId={currentPlayerId}
        />
        <div className="actions">
          <RestartButton onClick={handleResetAllState} />
          <SwitchMode label="電腦對弈模式" isActive={isSinglePlay} onClick={handleSwitchMode} />
        </div>
      </div>
    </TicTacTocStyle>
  );
}

export default TicTacToc;
