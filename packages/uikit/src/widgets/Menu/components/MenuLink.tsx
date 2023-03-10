import React, { AnchorHTMLAttributes } from "react";
import { NavLink } from "react-router-dom";

const MenuLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...otherProps }) => {
  const isHttpLink = href?.startsWith("http");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const Tag: any = isHttpLink ? "a" : NavLink;
  const Tag: any = "a";
  // const props = isHttpLink ? { href } : { to: href };
  const props = { href };
  return <Tag role="button" {...props} {...otherProps} />;
};

export default MenuLink;
