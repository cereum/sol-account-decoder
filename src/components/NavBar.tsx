import { Link } from "react-router-dom";
import { Button, H2 } from "@blueprintjs/core";
import styled from "styled-components";
import { NetworkSelector } from "./NetworkSelector";

type Props = {
  toggleAppTheme: () => void;
};

export const NavBar = <NavBarProps extends Props & React.HTMLAttributes<any>>({
  toggleAppTheme,
}: NavBarProps) => {
  return (
    <Header>
      <NavLink to="/">
        <H2 style={{ margin: 0 }}>Solana Account Decoder</H2>
      </NavLink>
      <div>
        <NetworkSelector />
        <Button
          style={{ marginLeft: 2 }}
          onClick={toggleAppTheme}
          icon="lightbulb"
        />
      </div>
    </Header>
  );
};

const NavLink = styled(Link)`
  :hover {
    outline: none;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Header = styled.div`
  height: 45px;
  background: rgb(25, 25, 25, 0.1);
  border-bottom: 1px solid rgba(5, 5, 5, 0.5);
  padding-right: 8px;
  padding-left: 8px;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
