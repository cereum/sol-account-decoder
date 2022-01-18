import { Button, H2 } from "@blueprintjs/core";
import styled from "styled-components";
import { useSolana } from "@saberhq/use-solana";

type Props = {
  toggleAppTheme: () => void;
};

export const NavBar = <PROPS extends Props & React.HTMLAttributes<any>>({
  toggleAppTheme,
}: PROPS) => {
  const { network } = useSolana();
  return (
    <Header>
      <H2 style={{ margin: 0 }}>Solana Account Decoder</H2>
      <div>
        <Button text={network} />
        <Button
          style={{ marginLeft: 2 }}
          onClick={toggleAppTheme}
          icon="lightbulb"
        />
      </div>
    </Header>
  );
};

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
