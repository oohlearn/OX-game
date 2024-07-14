import React from "react";
import CircleIcon from "./Icons/CircleIcon";
import CrossIcon from "./Icons/CrossIcon";
import PropTypes from "prop-types";

const Chess = ({ playerId, ...props }) => {
  const intPlayerId = parseInt(playerId);
  if (intPlayerId === 1) {
    return <CircleIcon {...props} />;
  } else if (intPlayerId === -1) {
    return <CrossIcon {...props} />;
  } else {
    return null;
  }
};
Chess.propTypes = {
  playerId: PropTypes.number,
};
export default Chess;
