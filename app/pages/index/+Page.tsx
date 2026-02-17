import { useData } from 'vike-react/useData';

import LogoSvg from '@/inline/images/dianalu-logo.svg?react';
import type { Data } from './+data.client';

export default function Page() {
  const { tagline, dummyContent } = useData<Data>();

  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-black leading-relaxed">
      <div className="max-w-[600px] py-[60px] px-[30px] md:py-20 md:px-10 text-center">
        <div className="w-20 h-20 md:w-[300px] md:h-[100px] mx-auto mb-10 md:mb-[50px]">
          <LogoSvg className="hover:opacity-0 transition-all duration-300" />
        </div>

        <h1 className="text-[2.8rem] md:text-[3.5rem] font-thin tracking-[-2px] mb-[15px]">
          Diana Lescure Ureña
        </h1>
        <div className="text-[0.9rem] md:text-base font-normal text-gray-600 mb-[60px] uppercase tracking-[3px] md:tracking-[4px] leading-normal">
          {tagline}
        </div>
        {dummyContent && (
          <div className="text-base text-gray-500 mb-[40px]">
            {dummyContent}
          </div>
        )}

        <div>
          <h2 className="text-[0.8rem] font-semibold uppercase tracking-[4px] mb-[25px] text-black">
            Contact:
          </h2>
          <a
            href="mailto:hola@dianalu.design"
            className="inline-flex items-center justify-center text-base md:text-[1.2rem] text-black border-2 border-black py-3 px-[25px] md:py-[15px] md:px-[30px] transition-all duration-300 tracking-[1px] cursor-pointer hover:bg-gray-300"
          >
            <span>hola</span>
            <span className="pt-[6px] mr-[2px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4"/>
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>
              </svg>
            </span>
            <span>dianalu.design</span>
          </a>
        </div>
      </div>
    </div>
  );
}
