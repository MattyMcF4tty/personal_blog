import { NextPage } from 'next';
import { useRouter } from 'next/router';

const RepoPage: NextPage = ({ params }: any) => {
  const id = params.id;
  return (
    <main>
      <div>{id}</div>
    </main>
  );
};

export default RepoPage;
