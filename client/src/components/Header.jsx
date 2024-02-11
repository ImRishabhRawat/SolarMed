import Logo from "./Logo";
import Nav from "./Nav";
// import Navbar from "./Navbar";

export const Header = () => {
  return (
      <header className="  fixed top-0 z-10 w-full bg-background px-4 py-2 font-regular uppercase ">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between border-b border-gray-400">
        
      <Logo />
          {/* <Navbar /> */}
          <Nav />
        </div>
    </header>
  );
};

export default Header;