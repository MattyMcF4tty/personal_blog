import OverviewBox from '@/components/OverviewBox';
import ProjectBubble from '@/components/ProjectBubble';
import { NextPage } from 'next';

export default function Home<NextPage>() {
  return (
    <main>
      <OverviewBox className="bg-blue-800"></OverviewBox>
      <OverviewBox className="bg-white p-[40px]">
        {/*         <ProjectBubble />
         */}{' '}
      </OverviewBox>
    </main>
  );
}
