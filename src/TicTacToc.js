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
  // 解構judgmentInfo裡面的東西，方便後面撰寫（不然就要寫judgmentInfo.winnerId）
  const { winnerId, winnerStepsList, lastStepsToWin } = judgmentInfo;
  // 只是要讓贏家出現時，在獲勝的路線上套上特定CSS
  const winnerSteps = winnerStepsList.flatMap((steps) => steps);

  // JS中，如果將一個數值賦予一個變數，然後這個變數又拿去條件判斷if(hasWinner)
  // 如果winnerId為0，則hasWinner會變成false；只要winnerId!=0，hasWinner就是True
  const hasWinner = winnerId;

  const handleClickSquare = (squareId) => {
    // 如果在loading的話，表示電腦還在下，玩家就不能進行下棋的動作
    if (isLoading) {
      return;
    }
    // 確認該格子是否屬於任何一位玩家
    const isSquareDisable =
      playerStepsMap[PLAYERS[0]].includes(squareId) ||
      playerStepsMap[PLAYERS[1]].includes(squareId);

    // 如果該格子不屬於任何人（還可以下）且贏家尚未出現，
    // 則宣告一個該玩家更新後的歷程（nextPlayerStepMap)，然後覆蓋原有歷程setPlayerStepMap
    if (!isSquareDisable && !hasWinner) {
      const nextPlayerStepMap = {
        ...playerStepsMap,
        [currentPlayerId]: [...playerStepsMap[currentPlayerId], squareId],
      };
      setPlayerStepMap(nextPlayerStepMap);
      // 下完該回後，確認勝負狀態
      setJudgmentInfo(getJudgment(nextPlayerStepMap));
      // 切換玩家
      setCurrentPlayerId((prev) => prev * -1);
    }
  };

  const getJudgment = (playerStepsMap) => {
    let lastStepsToWin = { ...defaultUsersSteps }; //空的
    const playerIds = Object.keys(playerStepsMap).map((playerId) => Number(playerId)); //將Id取出，並轉換為數字
    let winnerId = 0;
    let winnerStepsList = []; //獲得勝利的路線，可能不只一條，所以用陣列

    playerIds.forEach((playerId) => {
      const userSteps = playerStepsMap[playerId];
      const remainingStepList = WINNER_STEPS_LIST.map((steps) =>
        steps.filter((step) => userSteps.indexOf(step) === -1)
      ); //跟獲勝路線裡的位置一一對照，獲勝路線裡還沒被填滿的就回傳成新陣列
      const foundWinner =
        remainingStepList.filter((steps, index) => {
          // 差一步就可以勝利的格子：給電腦下棋位置的參考用，不影響皆為人類玩家勝負
          if (steps.length === 1) {
            lastStepsToWin[playerId] = [...lastStepsToWin[playerId], ...steps];
          }
          // 真正影響勝負判斷
          if (steps.length === 0) {
            winnerStepsList = [...winnerStepsList, WINNER_STEPS_LIST[index]];
            return true;
          }
          return false;
        }).length > 0;
      // 後面還接.length>0??
      // A. filter返回的新陣列只收錄回傳true值的steps，從條件式看，只有當steps.length === 0時
      // 才會回傳true，就會加入到filter後的新陣列，使remainingStepList的length>0→讓foundWinner =true
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

  const handleResetAllState = () => {
    setCurrentPlayerId(PLAYERS[0]);
    setPlayerStepMap(defaultUsersSteps);
    setJudgmentInfo({ winnerId: 0, winnerStepsList: [] });
    // lastStepsToWin每次進Judge時都是空的，所以不用reset
  };

  const handleSwitchMode = () => {
    setIsSinglePlay((prev) => !prev);
  };

  // 電腦下棋
  // TODO找出還可以下棋的格子
  const getIsBlockEnable = (blockId) => {
    // 把兩位玩家的steps壓平
    const allDisabledBlockIds = PLAYERS.flatMap((playerId) => playerStepsMap[playerId]);
    const isBlockEnable = allDisabledBlockIds.indexOf(blockId) === -1;
    return isBlockEnable;
  };
  // TODO電腦選擇要下的格子
  const selectBlockId = ({ lastStepsToWin, getIsBlockEnable }) => {
    // 這塊邏輯不懂
    // A
    const attackList = lastStepsToWin[-1]; //-1這位玩家（預設電腦是-1玩家）下一步下這個list裡面的位置就能贏
    const protectList = lastStepsToWin[1]; //1這位玩家（預設是人類玩家）剩下一步就會贏 → 電腦要防禦就要下在這個list的位置
    // 確認攻擊/防禦的位置是否還能下棋
    const stepToAttack = attackList.filter((blockId) => getIsBlockEnable(blockId));
    const stepToProtect = protectList.filter((blockId) => getIsBlockEnable(blockId));

    // 將電腦設定為攻擊優先模式（先考慮attackList）
    // 無論攻擊或防禦都選擇list裡面的第一個（誰知道有沒有其他個可以選）
    if (stepToAttack.length > 0) {
      return stepToAttack[0];
    }
    if (stepToProtect.length > 0) {
      return stepToProtect[0];
    }
    // 要是都沒急迫的攻擊或防禦就優先下中間那個位置
    let blockId = 4;
    // 上面條件都沒得滿足的話，就從九個位置裡面隨機挑（但要經過getIsBlockEnable測試可以下，不然就再挑一次）
    // 所以上面選4號位置也會經測試
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
  // 為何不能只用map就好?
  // A壓平以後回傳的list如果長度等於9 → 所有格子都被下滿了 → 平手；只用map的話很麻煩，還要想是誰下5顆誰下4顆

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
