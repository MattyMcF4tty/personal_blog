import LinkButton from '@/components/layout/LinkButton';
import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = async () => {
  return (
    <main className="flex flex-col h-screen justify-center">
      <h1 className="absolute lg:top-[35%] md:top-[20%] sm:top-[10%] top-0">
        Hello I&apos;m Matthias <br /> A full stack web developer
      </h1>
      <div className="absolute flex flex-row justify-between w-[54rem] bottom-44">
        <LinkButton href="/about">about</LinkButton>
        <LinkButton href="/projects">Projects</LinkButton>
        <LinkButton href="/work">Work</LinkButton>
        <LinkButton href="/blog">Blog</LinkButton>
      </div>
    </main>
  );
};

export default Home;
