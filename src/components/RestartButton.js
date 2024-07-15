import styled from "styled-components";

const RestartButtonStyle = styled.div`
  font-size: 28px;
  cursor: pointer;
  font-family: "Black Han Sans", sans-serif;
  background: ${(props) => props.theme.restartButton.normal};
  &:hover {
    background: ${(props) => props.theme.restartButton.hover};
  }
  &:active {
    background: ${(props) => props.theme.restartButton.active};
  }
  color: ${(props) => props.theme.color};
  border-radius: 50px;
  height: 56px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function RestartButton({ onClick }) {
  return (
    <>
      <RestartButtonStyle onClick={onClick}>
        <span>RestartButton</span>
      </RestartButtonStyle>
    </>
  );
}
export default RestartButton;
