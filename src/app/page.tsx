import OverviewBox from '@/components/OverviewBox';
import ProjectBubble from '@/components/ProjectBubble';
import { fetchUserRepos } from '@/utils/github';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = async () => {
  const currentProject = (await fetchUserRepos(1, 1, 'desc'))[0];

  return (
    <main>
      <OverviewBox className="flex flex-row justify-between">
        <div className="flex flex-col h-full justify-between items-center">
          <div className="flex flex-col">
            <h1 className="">Hi</h1>
            <h1 className="">I&apos;m Matthias</h1>
          </div>
          <Link href="aboutMe" className="">
            [ About me ]
          </Link>
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
        <h3 className="text-black mb-2 select-none w-full">Current project</h3>
        <div className="w-full h-[calc(100%-6rem)]">
          <h1 className="mb-4">{currentProject.name}</h1>
          <div className="mb-10 flex flex-wrap gap-2">
            {currentProject.topics.map((topic) => (
              <p key={topic} className="rounded-full border-2 px-2">
                {topic}
              </p>
            ))}
          </div>

          <span className="">{currentProject.description}</span>
        </div>
        <div className="">
          <Link
            href={`repositories/${currentProject.name}`}
            className="text-black mt-4 text-lg hover:font-bold duration-150"
          >
            [ View project ]
          </Link>
          <Link
            href="repositories"
            className="text-black mt-4 text-lg hover:font-bold mx-5 duration-150"
          >
            [ Show more projects... ]
          </Link>
          <Link
            href={currentProject.url}
            target="_blank"
            className="text-black mt-4 text-lg hover:font-bold duration-150"
          >
            [ View code ]
          </Link>
        </div>
      </OverviewBox>
    </main>
  );
};

export default Home;
