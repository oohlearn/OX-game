import styled, { css } from "styled-components";
import { BUTTON_HEIGHT } from "../../constants";

const activeThumbStyle = css`
  left: ${BUTTON_HEIGHT}px;
  //如果是active，往左邊位移BUTTON_HEIGHT px
`;

const activeButtonStyle = css`
  background: ${(props) => props.theme.switchButton.on};
`;
const StyleSwitch = styled.div`
  position: relative; //Q
  height: ${BUTTON_HEIGHT}px;
  width: ${BUTTON_HEIGHT * 2}px;
  border: 2px solid #fff;
  border-radius: 50px;
  cursor: pointer;
  background: ${(props) => props.theme.switchButton.off};
  transition: all 0.2s ease-in-out;
  box-shadow: inset -4px -4px 12px 0px rgn(0 0 0 /20%);
  ${({ $isActive }) => $isActive && activeThumbStyle}
  .switchBtn_thumb {
    position: absolute;
    /* 下面三行決定thumb外型 */
    height: ${BUTTON_HEIGHT}px;
    width: ${BUTTON_HEIGHT}px;
    border-radius: 50%;
    background: #fff;
    transition: all 0.2s ease-in-out;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset -4px -4px 12px 0px rgn(0 0 0 /20%);
    ${({ $isActive }) => $isActive && activeButtonStyle}
  }
`;

function SwitchButton({ isActive }) {
  return (
    <StyleSwitch>
      <div className="switchBtn_thumb">
        <span>{isActive ? "ON" : "OFF"}</span>
      </div>
    </StyleSwitch>
  );
}
export default SwitchButton;
