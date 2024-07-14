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
  const squareIds = new Array(9).fill(0).map((_, index) => index);
  const playerIds = Object.keys(playerStepsMap);
  const getPlayerId = (squareId) => {
    let foundPlayerId = 0;
    playerIds.forEach((playerId) => {
      const steps = playerStepsMap[playerId];
      if (steps.includes(squareId)) {
        foundPlayerId = playerId;
      }
    });
    return parseInt(foundPlayerId);
  };
  // Q為何下面判斷iswinnerstep要用>-1，不直接用===1?
  return (
    <>
      <GridContainer>
        {squareIds.map((squareId) => (
          <Square
            key={squareId}
            onClick={() => handleClickSquare(squareId)}
            playerId={getPlayerId(squareId)}
            isWinnerStep={winnerSteps.indexOf(squareId) > -1}
          ></Square>
        ))}
      </GridContainer>
    </>
  );
}
// Q這啥?
NineSquares.propTypes = {
  squareId: PropTypes.number,
};
export default NineSquares;
