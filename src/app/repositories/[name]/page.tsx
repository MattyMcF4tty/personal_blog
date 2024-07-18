import TextSection from '@/components/TextSection';
import { fetchRepo } from '@/utils/github';
import { falsePromise } from '@/utils/misc';
import { NextPage } from 'next';

const RepoPage: NextPage = async ({ params }: any) => {
  const repoName = params.name;
  const repoData = await fetchRepo(repoName);
  const updateDate = new Date(repoData.lastUpdate);

  return (
    <main className="px-[20vw]">
      <div className="mb-4">
        <h1 className="text-6xl">{repoData.name}</h1>
        <p className="text-sm">
          Updated: {updateDate.getHours()}:{updateDate.getMinutes()} {updateDate.getDate()}/
          {updateDate.getMonth()}-{updateDate.getFullYear()}
        </p>
      </div>

      <TextSection title="Description" className=" w-full border">
        <span className="text-black">
          Hejiusdhfgasdiufghsilghbfadgifbfhdfhgdfhsfghhsfghsfghsgfhsgh
          Hejiusdhfgasdiufghsilghbfadgifbhhdfhgdfhsfghhsfghsfghsgfhsgh
        </span>
      </TextSection>
    </main>
  );
};

export default RepoPage;
