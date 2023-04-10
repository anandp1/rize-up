import Head from "next/head";

interface HeadProps {
  children?: React.ReactNode;
}

const HeadComponent: React.FC = ({ children }: HeadProps) => {
  return (
    <Head>
      {children}
      <title>Rize Up</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default HeadComponent;
