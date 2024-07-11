import styled from "styled-components";
import Information from "./components/Information";
import Squares from "./components/squares/index";
import RestartButton from "./components/RestartButton";
import SwitchButton from "./components/SwitchButton";
import { useState } from "react";

const TicTacTocStyle = styled.div`
  * {
    border: 1px solid black;
    padding: 4px;
  }
  /* container在背景置中 */
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh
  box-sizing: border-box;
  /* Q給元件之間一些間距，但語法看不懂 */
  .container {
    display: flex;
    flex-direction: column;
    &>*: not(: first-of-type) {
      margin-top: 4px;
    }
  }
  .actions {
    &>*: not(: first-of-type) {
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
  const [judgmentInfo, setJudgmentInfo] = useState({
    winnerId: 0,
    winnerStepsList: [],
    lastStepsToWin: {},
  });
  const { winnerId, winnerStepsList, lastStepsToWin } = judgmentInfo;
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
        <Squares playerStepsMap={playerStepsMap} winnerStepsList={winnerStepsList} />
        <div className="actions">
          <RestartButton />
          <SwitchButton isActive={isSinglePlay} />
        </div>
      </div>
    </TicTacTocStyle>
  );
}

export default TicTacToc;
// handleClickSquare={handleClickSquare}
{
  /* <RestartButton onClick={handleResetAllState} />; */
}
{
  /* <SwitchButton isActive={isSinglePlay} onClick={handleSwitchPlayMode} />; */
}
