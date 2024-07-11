import styled from "styled-components";
import Information from "./components/Information";
import Squares from "./components/Squares";
import RestartButton from "./components/RestartButton";
import SwitchButton from "./components/SwitchButton";
import { useState } from "react";

const TicTacTocStyle = styled.div`
  * {
    border: 1px solid black;
    padding: 4px;
  }
`;
const PLAYERS = [1, -1];
const defaultUsersSteps = {
  [1]: [],
  [-1]: [],
};
function TicTacToc() {
  const [currentPlayerId, setCurrentPlayerId] = useState(PLAYERS[0]);
  const [playerStepsMap, setPlayerStepMap] = useState(defaultUsersSteps);
  const [isSinglePlay, setIsSinglePlay] = useState(false);
  const [judgmentInfo, setJudgmentInfo] = useState({
    winnerId: 0,
    winnerStepsList: [],
    lastStepsToWin: {},
  });
  const { winnerId, winnerStepsList, lastStepsToWin } = judgmentInfo;
  const isGameEndedInTie = PLAYERS.flatMap((playerId) => playerStepsMap[playerId]).length === 9;
  // 為何不能只用map就好?

  return (
    <TicTacTocStyle className="background">
      <div className="container">
        <Information
          currentPlayerId={currentPlayerId}
          winnerId={winnerId}
          isGameEndedInTie={isGameEndedInTie}
        />
        <Squares
          playerStepsMap={playerStepsMap}
          winnerStepsList={winnerStepsList}
          handleClickSquare={handleClickSquare}
        />
        <div className="actions">
          <RestartButton onClick={handleResetAllState} />
          <SwitchButton isActive={isSinglePlay} onClick={handleSwitchPlayMode} />
        </div>
      </div>
    </TicTacTocStyle>
  );
}

export default TicTacToc;
