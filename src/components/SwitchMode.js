import styled from "styled-components";
import SwitchButton from "./Switch/SwitchIndex";

const Row = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  margin-left: 8px;
  font-size: 20px;
  color: ${(props) => props.theme.color};
`;

function SwitchMode({ label, isActive, onClick }) {
  return (
    <Row>
      <SwitchButton isActive={isActive} onClick={onClick} />
      <Label>{label}</Label>
    </Row>
  );
}
export default SwitchMode;
