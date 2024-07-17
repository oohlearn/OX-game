import Chess from "./Chess";
import styled from "styled-components";

const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  border-radius: 12px;
  background: #ffffff;
  .informationChess {
    width: 50px;
  }
`;

const Text = styled.div`
  margin-right: 20px;
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 700;
  font-size: 32px;
  white-space: nowrap;
  color: ${(props) => (props.$variant === "piece" ? "green" : "#4caf50")};
`;

function Information({ currentPlayerId, winnerId, isGameEndedInTie }) {
  const makeContent = () => {
    const hasWinner = winnerId !== 0;
    if (isGameEndedInTie) {
      return <Text $variant="piece">和局</Text>;
    } else if (!hasWinner) {
      return (
        <InformationContainer>
          <Text className="text">輪到:</Text>
          <Chess playerId={currentPlayerId} className="informationChess" />
        </InformationContainer>
      );
    } else {
      return (
        <InformationContainer>
          <Chess playerId={winnerId} className="informationChess" />
          <Text>贏得這一局</Text>
        </InformationContainer>
      );
    }
  };
  return (
    <>
      <InformationContainer>{makeContent()}</InformationContainer>
    </>
  );
}
export default Information;
