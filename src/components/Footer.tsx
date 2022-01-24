import styled from "styled-components";

export const Footer = () => {
  return (
    <FooterStyle>
      <NavLink>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/cereum/sol-account-decoder/"
          style={{ margin: 0 }}
        >
          Contribute here!{" "}
        </a>
      </NavLink>
    </FooterStyle>
  );
};

const NavLink = styled.div`
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

const FooterStyle = styled.footer`
  height: 45px;
  bottom: 0;
  width: 100%;
`;
