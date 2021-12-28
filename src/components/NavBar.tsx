import { Popover } from "@headlessui/react";
import { useSolana } from "@saberhq/use-solana";
require("./NavBar.css");
type Props = {
  toggle: () => void;
};
export const NavBar = <PROPS extends Props & React.HTMLAttributes<any>>({
  toggle,
}: PROPS) => {
  const { network } = useSolana();
  return (
    <Popover className="relative bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10 navBar">
          <div className="md:flex items-center justify-end md:flex-1 lg:w-0 wallet">
            <p
              className={`ml-8 md:w-50 bg-yellow-500 text-white font-bold py-1 px-4 rounded text-center`}
            >
              {network}
            </p>
          </div>
        </div>
      </div>
    </Popover>
  );
};
