import styled from "styled-components";
import { PAGE_PADDING, MAX_CONTENT_WIDTH } from "../../constants";
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

function Squares() {
  const squareIds = new Array(9).fill(0).map((_, index) => index);

  return (
    <>
      <GridContainer>
        {squareIds.map((squareId) => (
          <Square key={squareId} squareId={squareId} />
        ))}
      </GridContainer>
    </>
  );
}
export default Squares;
