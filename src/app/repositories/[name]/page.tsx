import CommitBox from '@/components/CommitBox';
import ContentBox from '@/components/ContentBox';
import ContributorBox from '@/components/ContributorBox';
import TextSection from '@/components/TextSection';
import { fetchRepo, fetchRepoCommits, fetchRepoContributors } from '@/utils/github';
import { readableDateDif } from '@/utils/misc';
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';

const RepoPage: NextPage = async ({ params }: any) => {
  const repoName = params.name; //Gets repository name from query

  /* Fetch nessecary data */
  const repoData = await fetchRepo(repoName); //Fetches repository data
  const contributors = await fetchRepoContributors(repoName); //Fetches repository contributors
  const commits = await fetchRepoCommits(repoName); //Fetces repository commits

  /* Makes date easily readable */
  const updateDate = new Date(repoData.lastUpdate); //Creates a Date object from the update date.
  const readableDate = readableDateDif(updateDate); //Calculates difference between now and last update and returns in easily readable srting

  return (
    <main className="grid grid-cols-3 items-start min-h-screen py-20 px-20 relative">
      {/* Contributor content box */}
      <ContentBox className="col-start-1 col-span-1 max-w-xs sticky top-20">
        <h2 className="text-2xl font-bold mb-2">Contributors</h2>
        {contributors.map((contributor) => (
          <ContributorBox contributor={contributor} key={contributor.id} />
        ))}
      </ContentBox>
      {/* Repository text content box */}
      <ContentBox className="w-full max-w-3xl col-start-2 col-span-1">
        {/* Heading */}
        <div className="flex flex-row w-full justify-between">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{repoData.name}</h1>
            <p className="text-sm text-gray-500">Repository updated {readableDate}</p>
          </div>
          <div className="text-sm text-gray-500 flex flex-row max-w-xs select-none">
            <p className="mr-2">
              <FontAwesomeIcon icon={faEye} /> {repoData.watchers}
            </p>
            <p>
              <FontAwesomeIcon icon={faStar} /> {repoData.stars}
            </p>
          </div>
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
      </ContentBox>

      {/* Commits content box */}
      <ContentBox className="col-start-3 col-span-1 max-w-xs top-20 justify-self-end sticky max-h-[calc(100vh-10rem)] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2">Commits</h2>

        {commits.map((commit) => (
          <div key={commit.sha}>
            <CommitBox commit={commit} />
            {/*             <hr className="border-b border-black" />
             */}{' '}
          </div>
        ))}
      </ContentBox>
    </main>
  );
};

export default RepoPage;
