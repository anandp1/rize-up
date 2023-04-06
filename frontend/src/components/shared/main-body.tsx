interface MainBodyProps {
  children: React.ReactNode;
}

const MainBody: React.FC<MainBodyProps> = ({ children }: MainBodyProps) => {
  return (
    <div className="grid grid-cols-1 grow h-full bg-gradient-to-t from-slate-800 to-stone-900">
      <div className="relative px-6 py-4 flex flex-col">{children}</div>
    </div>
  );
};

export default MainBody;
