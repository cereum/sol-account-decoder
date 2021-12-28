export type LogoProps = {
  type?: "full" | "small";
};

export const Logo = ({ type = "small" }: LogoProps) => {
  const src = `/images/logo_${type}.svg`;
  return <img className="w-max max-w-full" src={src} alt="ButterSwap" />;
};
