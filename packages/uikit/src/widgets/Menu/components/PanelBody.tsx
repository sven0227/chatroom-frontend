import React, { createElement, memo } from "react";
import styled from "styled-components";
// import { useLocation } from "react-router-dom";
import { HamburgerCloseIcon, HamburgerIcon, SvgProps } from "../../../components/Svg";
// import * as IconModule from "../icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel, LinkStatus } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "../types";
import MenuItem from "../../../components/MenuItem";
import { Button } from "../../../components/Button";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

// const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

const MenuButton = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: 0 8px;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  height: 50px;
  display: flex;
  border: none;
  margin-right: 24px;
  margin-left: 6px;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links, activeItem, activeSubItem }) => {

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;
  const handleClickNav = () => pushNav(!isPushed);
  return (
    <Container>
      <MenuButton aria-label="Toggle menu" onClick={handleClickNav}>
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color="textSubtle" />
        ) : (
          <HamburgerIcon width="24px" color="textSubtle" />
        )}
      </MenuButton>
      {links.map((entry) => {
        const Icon = entry.icon;
        // const iconElement = <Icon width="24px" mr="8px" />;
        const iconElement = createElement(Icon as any, { color: entry.href === activeItem || entry.items?.some((item) => item.href === activeSubItem) ? "secondary" : "textSubtle", marginRight: '16px' })
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items && entry.items.length > 0) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === activeSubItem);
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;

          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              status={entry.status}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.href === activeItem || entry.items?.some((item) => item.href === activeSubItem)}
            >
              
              {isPushed &&
                entry.items.map((item) => (
                  <MenuEntry key={item.href} secondary isActive={item.href === activeSubItem} onClick={handleClick}>
                    <MenuItem href={item.href} isActive={item.href === activeSubItem} statusColor={item.status?.color} isDisabled={item.disabled}>
                      <LinkLabel isPushed={isPushed}>{item.label}</LinkLabel>
                      {item.status && (
                        <LinkStatus color={item.status.color} fontSize="14px">
                          {item.status.text}
                        </LinkStatus>
                      )}
                    </MenuItem>
                    {/* <MenuLink href={item.href}>
                      
                    </MenuLink> */}
                  </MenuEntry>
                ))}
            </Accordion>
          );
        }
        return (
          <MenuEntry key={entry.label} isActive={entry.href === activeItem} className={calloutClass} style={{ padding: '0' }}>
            <MenuItem href={entry.href} isActive={entry.href === activeItem} statusColor={entry.status?.color} isDisabled={entry.disabled}>
              {iconElement}
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
              {entry.status && (
                <LinkStatus color={entry.status.color} fontSize="14px">
                  {entry.status.text}
                </LinkStatus>
              )}
            </MenuItem>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;
