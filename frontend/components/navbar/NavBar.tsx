import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const NavBar: React.FC<{}> = () => {
  return (
    <div className="fixed w-full bg-[linear-gradient(144deg,theme('colors.c\_yellow.DEFAULT'),theme('colors.c\_orange.DEFAULT')_50%,theme('colors.c\_red.DEFAULT'))] z-10 shadow-sm">
      <div
        className="
          py-4
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          "
          >
            <div className="flex items-center justify-center gap-4">
              <Logo />
              <h1 className="font-semibold text-xl">tuahXchange</h1>
            </div>
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
