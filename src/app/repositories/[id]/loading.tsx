import { NextPage } from 'next';

const RepoLoadingPage: NextPage = () => {
  return (
    <main>
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl animate-pulse">Loading Repository...</h1>
      </div>
    </main>
  );
};

export default RepoLoadingPage;
