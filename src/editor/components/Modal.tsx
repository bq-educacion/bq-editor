import styled from "@emotion/styled";
import { adjustColorOpacity, colors } from "../../theme";

export default styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 3px 7px 0 ${adjustColorOpacity(colors.dark, 0.5)};
  color: ${colors.dark};
  padding: 20px;
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 386px;

  a {
    cursor: pointer;
    color: ${colors.orange1};
  }

  > div {
    display: flex;
    align-items: center;
    gap: 13px;
    width: 100%;

    button {
      flex: 1;
    }

    label {
      font-weight: bold;
      margin-bottom: -5px;
      min-width: 45px;
    }
  }
`;
