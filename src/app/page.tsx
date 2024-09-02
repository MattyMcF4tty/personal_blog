import OverviewBox from '@/components/OverviewBox';
import ProjectBubble from '@/components/ProjectBubble';
import { fetchUserRepos } from '@/utils/github';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = async () => {
  const repos = await fetchUserRepos(1, 1, 'desc');

  return (
    <main>
      <OverviewBox className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-blue-950 to-blue-500 font-bold text-5xl">
            Hi
          </h1>
          <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-blue-950 to-blue-500 font-bold text-5xl">
            I&apos; m Matthias
          </h1>
        </div>

        <Image
          alt="Portrait Image"
          src={'/portrait.jpg'}
          width={400}
          height={25}
          className="rounded-md"
        />
      </OverviewBox>
      <OverviewBox className="flex flex-col items-center bg-slate-100 shadow-inner">
        <h1 className="text-black text-[62px] mb-2 select-none w-full">Latest projects</h1>
        <div className="grid grid-rows-2 grid-cols-2 gap-8 h-[calc(100%-6rem)] w-full">
          {repos.map((repo) => (
            <ProjectBubble key={repo.id} repo={repo} />
          ))}
        </div>
        <Link href="repositories" className="text-black mt-4 text-lg">
          Show more...
        </Link>
      </OverviewBox>
    </main>
  );
};

export default Home;
