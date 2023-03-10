import { ElementType, ReactElement, ReactNode } from "react";
import { FooterLinkType } from "../../components/Footer/types";
import { Colors } from "../../theme/types";

export interface Language {
  code: string;
  language: string;
  locale: string;
}

export interface LinkStatus {
  text: string;
  color: keyof Colors;
}

export interface MenuSubEntry {
  label?: string | React.ReactNode;
  href?: string;
  onClick?: () => void;
  calloutClass?: string;
  status?: LinkStatus;
  disabled?: boolean;
}

export interface MenuEntry {
  label: string;
  href?: string;
  icon?: ElementType<any>;
  fillIcon?: ElementType<any>;
  items?: MenuSubEntry[];
  disabled?: boolean;
  calloutClass?: string;
  initialOpenState?: boolean;
  status?: LinkStatus;
}

export interface NavProps {
  linkComponent?: ElementType;
  rightSide?: ReactNode;
  banner?: ReactElement;
  chat?: ReactElement;

  links: Array<MenuEntry>;
  subLinks: Array<MenuSubEntry>;
  footerLinks: Array<FooterLinkType>;
  activeItem: string;
  activeSubItem: string;
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  cakePriceUsd?: number;
  currentLang: string;
  buyCakeLabel: string;
  langs: Language[];
  setLang: (lang: Language) => void;
}

export interface PanelProps {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
  cakePriceUsd?: number;
  currentLang: string;
  langs: Language[];
  setLang: (lang: Language) => void;
  links: Array<MenuEntry>;
  activeItem: string;
  activeSubItem: string;
}

export interface PushedProps {
  isPushed: boolean;
  pushNav: (isPushed: boolean) => void;
}
