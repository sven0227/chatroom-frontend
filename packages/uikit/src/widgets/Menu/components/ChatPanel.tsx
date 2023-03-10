import React, { ReactElement } from "react";
import styled from "styled-components";
import PanelBody from "./PanelBody";
// import PanelFooter from "./PanelFooter";
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "../config";
import { PanelProps, PushedProps } from "../types";
import { Text } from "../../../components/Text";

interface Props {
  showMenu: boolean;
  showChat: boolean;
  totalMenuHeight: number;
  chatLayout?: ReactElement;
}

const StyledPanel = styled.div<{ showMenu: boolean; showChat: boolean; totalMenuHeight: number; }>`
  position: fixed;
  padding-top: ${({ showMenu, totalMenuHeight }) => (showMenu ? `${totalMenuHeight}px` : 0)};
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.nav.background};
  width: ${({ showChat }) => (showChat ? `340px` : 0)};
  height: auto;
  max-height: 100%;
  transition: padding-top 0.2s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 11;
//   overflow: ${({ showChat }) => (showChat ? "initial" : "hidden")};
//   transform: translate3d(0, 0, 0);
//   ${({ showChat }) => !showChat && "white-space: nowrap;"};

//   ${({ theme }) => theme.mediaQueries.nav} {
//     border-right: 2px solid rgba(133, 133, 133, 0.1);
//     width: ${({ showChat }) => `${showChat ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
//   }
`;

const ChatPanel: React.FC<Props> = (props) => {
  const { showMenu, showChat, totalMenuHeight, chatLayout } = props;
  return (
    <StyledPanel showChat={showChat} totalMenuHeight={totalMenuHeight} showMenu={showMenu}>
      {chatLayout}
      {/* <PanelFooter {...props} /> */}
    </StyledPanel>
  );
};

export default ChatPanel;
