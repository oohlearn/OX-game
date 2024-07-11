import React from "react";
import propTypes from "prop-types";

function Square({ squareId }) {
  return <div>{squareId}</div>;
}
// Q這啥?
Square.propTypes = {
  squareId: propTypes.number,
};

export default Square;
