import Provider from "../components/Provider";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider>{children}</Provider>
    </>
  );
}
