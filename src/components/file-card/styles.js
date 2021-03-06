import { css } from "@emotion/react";

const styles = css`
  .square {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  .square:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .square-content {
    padding: 15px;
    margin-top: 15px;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export default styles;
