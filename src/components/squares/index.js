import styled from "styled-components";
import { PAGE_PADDING, MAX_CONTENT_WIDTH } from "../../constants";
import propTypes from "prop-types";

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

function Squares({ playerStepsMap, handleClickSquare }) {
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
    return foundPlayerId;
  };

  return (
    <>
      <GridContainer>
        {squareIds.map((squareId) => (
          <div
            key={squareId}
            onClick={() => handleClickSquare(squareId)}
            playerId={getPlayerId(squareId)}
          >
            {squareId}
          </div>
        ))}
      </GridContainer>
    </>
  );
}
// Q這啥?
// Square.propTypes = {
//   squareId: propTypes.number,
// };
export default Squares;
