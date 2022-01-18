import { H3, InputGroup } from "@blueprintjs/core";
import styled from "styled-components";

export const PublicKeyInput = ({
  setPublicKey,
}: {
  setPublicKey: Function;
}) => {
  return (
    <div>
      <H3 style={{ margin: 18, textAlign: "center" }}>Enter Account Address</H3>
      <Input
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPublicKey(event.target.value);
        }}
        placeholder="Enter an address"
      />
    </div>
  );
};

const Input = styled(InputGroup)`
  padding: 6px;
  width: 100%;
  border-radius: 2px;
  outline: none;
  border: none;
`;
