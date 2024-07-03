import OverviewBox from '@/components/OverviewBox';
import ProjectBubble from '@/components/ProjectBubble';
import { fetchUserData, fetchUserRepos } from '@/utils/github';
import { NextPage } from 'next';

export default async function Home<NextPage>() {
  const repos = await fetchUserRepos();

  return (
    <main>
      <OverviewBox className="bg-gradient-to-tr from-blue-950 to-blue-500"></OverviewBox>
      <OverviewBox className="bg-white border-2 border-green-700 flex flex-col items-center">
        <h1 className="text-black text-[62px] mb-2 select-none w-full">Latest projects</h1>
        <div className="grid grid-rows-2 grid-cols-2 gap-8 h-[calc(100%-6rem)] w-full">
          <ProjectBubble repo={repos[0]} />
          <ProjectBubble repo={repos[1]} />
          <ProjectBubble repo={repos[2]} />
          <ProjectBubble repo={repos[3]} />
        </div>
        <button className="text-black mt-4 text-lg">Show more...</button>
      </OverviewBox>
    </main>
  );
}
