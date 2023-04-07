import SideNavBar from "./nav/side-nav-bar";

interface MainBodyProps {
  children: React.ReactNode;
}

const MainBody: React.FC<MainBodyProps> = ({ children }: MainBodyProps) => {
  return (
    <div className="grid grid-cols-1 grow h-full">
      <div className="relative p-2 flex flex-row">
        <SideNavBar />
        <div className="relative px-6 py-4 flex flex-col bg-[#f4f4fc] w-full rounded-3xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainBody;
