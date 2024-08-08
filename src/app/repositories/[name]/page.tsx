import ContentBox from '@/components/ContentBox';
import TextSection from '@/components/TextSection';
import { fetchRepo } from '@/utils/github';
import { readableDateDif } from '@/utils/misc';
import { NextPage } from 'next';

const RepoPage: NextPage = async ({ params }: any) => {
  const repoName = params.name; //Gets repository name from query
  const repoData = await fetchRepo(repoName); //Fetches repository data
  const updateDate = new Date(repoData.lastUpdate); //Formats update date to a Javascript Date

  const readableDate = readableDateDif(updateDate);

  return (
    <main className="flex justify-center items-start min-h-screen py-20">
      <ContentBox className="w-full max-w-3xl">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{repoData.name}</h1>
          <p className="text-sm text-gray-500">Updated: {readableDate}</p>
        </div>

        {/* Body text */}
        <TextSection title="Description">
          <span>{repoData.description}</span>
        </TextSection>
        {repoData.readMe && (
          <TextSection title="ReadMe">
            <span>{repoData.readMe}</span>
          </TextSection>
        )}
        {repoData.readMe && (
          <TextSection title="ReadMe">
            <span>{repoData.readMe}</span>
          </TextSection>
        )}
        {repoData.readMe && (
          <TextSection title="ReadMe">
            <span>{repoData.readMe}</span>
          </TextSection>
        )}
      </ContentBox>
    </main>
  );
};

export default RepoPage;
