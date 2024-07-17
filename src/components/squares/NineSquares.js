import styled from "styled-components";
import { PAGE_PADDING, MAX_CONTENT_WIDTH } from "../../constants";
import PropTypes from "prop-types";
import Square from "./Square";

// 正方形，所以高度寬度的單位一樣
// calc可計算不相同單位的數值
const GridContainer = styled("div")`
  width: calc(100vw - ${PAGE_PADDING * 2}px);
  height: calc(100vw - ${PAGE_PADDING * 2}px);
  max-width: ${MAX_CONTENT_WIDTH - PAGE_PADDING * 2}px;
  max-height: ${MAX_CONTENT_WIDTH - PAGE_PADDING * 2}px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
`;

function NineSquares({ playerStepsMap, handleClickSquare, winnerSteps }) {
  // TODO設定9個格子的id：用array的index，value則用fill()填充0，但Id是index，兩個沒關係
  const squareIds = new Array(9).fill(0).map((_, index) => index);
  const playerIds = Object.keys(playerStepsMap);
  // 用來判斷這個格子是誰的
  const getPlayerId = (squareId) => {
    let foundPlayerId = 0;
    playerIds.forEach((playerId) => {
      const steps = playerStepsMap[playerId];
      if (steps.includes(squareId)) {
        foundPlayerId = playerId;
      }
    });
    return foundPlayerId;
  };
  // 為何下面判斷iswinnerstep要用>-1，不直接用===1?
  // A indexOf的用法，若有找到→回傳索引位置；沒找到 → 回傳-1
  // 如果直接用 ===1，只要不在1那個位置上，就會是false
  return (
    <>
      <GridContainer>
        {squareIds.map((squareId) => (
          <Square
            key={squareId}
            onClick={() => handleClickSquare(squareId)}
            playerId={parseInt(getPlayerId(squareId))}
            isWinnerStep={winnerSteps.indexOf(squareId) > -1}
          ></Square>
        ))}
      </GridContainer>
    </>
  );
}
// 這啥?
// React中的用來進行類型檢查的工具，如果上面出現的型別跟下面列的不一樣，就會在console看到警示
NineSquares.propTypes = {
  squareId: PropTypes.number,
};
export default NineSquares;
