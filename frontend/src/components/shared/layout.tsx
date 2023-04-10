import HeadComponent from "./head-component";
import MainBody from "./main-body";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <HeadComponent />
      <main className="w-full min-h-screen overflow-y relative flex flex-col">
        <MainBody>{children}</MainBody>
      </main>
    </>
  );
};

export default Layout;
