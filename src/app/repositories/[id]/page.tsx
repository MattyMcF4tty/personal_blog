import { NextPage } from 'next';

const RepoPage: NextPage = async ({ params }: any) => {
  const id = params.id;

  return (
    <main>
      <div>{id}</div>
    </main>
  );
};

export default RepoPage;
