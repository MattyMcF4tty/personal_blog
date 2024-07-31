import TextSection from '@/components/TextSection';
import { fetchRepo } from '@/utils/github';
import { NextPage } from 'next';

const RepoPage: NextPage = async ({ params }: any) => {
  const repoName = params.name; //Gets repository name from query
  const repoData = await fetchRepo(repoName); //Fetches repository data
  const updateDate = new Date(repoData.lastUpdate); //Formats update date to a Javascript Date

  return (
    <main className="px-[25vw]">
      <div className="mb-4">
        <h1 className="text-6xl">{repoData.name}</h1>
        <p className="text-sm">
          Updated: {updateDate.getHours()}:{updateDate.getMinutes()} {updateDate.getDate()}/
          {updateDate.getMonth()}-{updateDate.getFullYear()}
        </p>
      </div>

      <TextSection title="Description" className=" w-full border">
        <span className="text-black">{repoData.description}</span>
      </TextSection>
      {repoData.readMe && <TextSection title="ReadMe">{repoData.readMe}</TextSection>}
    </main>
  );
};

export default RepoPage;
