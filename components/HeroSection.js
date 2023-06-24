import "styles/hero.scss";
import { icons } from './Icons';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setAnimationClass('hero-animation');
  }, []);

  return (
    <section className={`landing-hero ${animationClass} flex align-items-center flex-column justify-content-center relative`}>
      <div className="hero-inner z-2 relative">
        <div className="flex flex-column md:align-items-center md:flex-row">
          <div className="p-2 flex flex-row md:flex-column">
            <div className="hero-box w-10rem h-10rem md:w-12rem md:h-12rem animation flex align-items-center justify-content-center" onClick={() => (window.location.href = '/')}>
              <div className="flex flex-column align-items-center">
                <div className="hero-svg">
                  {icons.lineChart({ size: 48, color: "#7232f2" })}
                </div>
                <div className="name">
                  <b>Charts</b>
                  <span>Custom Charts</span>
                </div>
              </div>
            </div>
            <div className="hero-box w-10rem h-10rem md:w-12rem md:h-12rem animation ml-4 md:ml-0 md:mt-4 flex align-items-center justify-content-center" onClick={() => (window.location.href = 'https://maps.milklegend.xyz')}>
              <div className="flex flex-column align-items-center">
                <div className="hero-svg">
                  {icons.map({ size: 48, color: "#7232f2" })}
                </div>
                <div className="name">
                  <b>Maps</b>
                  <span>Visualize DC</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-row md:flex-column">
            <div className="hero-box w-10rem h-10rem md:w-12rem md:h-12rem animation flex align-items-center justify-content-center" onClick={() => (window.location.href = 'https://www.democracycraft.net/forums/information-policy.44/')}>
              <div className="flex flex-column align-items-center">
                <div className="hero-svg">
                  {icons.openBook({ size: 48, color: "#7232f2" })}
                </div>
                <div className="name">
                  <b>Documentation</b>
                  <span>Information & Policies</span>
                </div>
              </div>
            </div>
            <div className="hero-box w-10rem h-10rem md:w-12rem md:h-12rem animation logo hidden md:flex my-4 align-items-center justify-content-center">
              <div className="hero-box-inner text-center">
                <Image src="https://imgs.milklegend.xyz/dept_commerce.png" alt="primereact main" width={96} height={96} />
                <div className="name">
                  <b className="font-bold">DOC Analytics</b>
                </div>
              </div>
            </div>
            <div className="hero-box w-10rem h-10rem md:w-12rem md:h-12rem animation flex ml-4 md:ml-0 align-items-center justify-content-center" onClick={() => (window.location.href = 'https://www.democracycraft.net/forums/applications.24/')}>
              <div className="flex flex-column align-items-center">
                <div className="hero-svg">
                  {icons.checkList({ size: 48, color: "#7232f2" })}
                </div>
                <div className="name">
                  <b>Apply</b>
                  <span>DOC Applications</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-row md:flex-column">
            <div className="hero-box w-10rem h-10rem md:w-12rem md:h-12rem animation flex align-items-center justify-content-center" onClick={() => (window.location.href = 'https://tracker.milklegend.xyz')}>
              <div className="flex flex-column align-items-center">
                <div className="hero-svg">
                  {icons.moneyBill({ size: 48, color: "#7232f2" })}
                </div>
                <div className="name">
                  <b>Price Tracker</b>
                  <span>5000+ ChestShops</span>
                </div>
              </div>
            </div>
            <Link href="/" passHref>
              <div className="hero-box w-10rem h-10rem md:w-12rem md:h-12rem animation flex ml-4 md:ml-0 md:mt-4 align-items-center justify-content-center">
                <div className="flex flex-column align-items-center">
                  <div className="hero-svg">
                    {icons.questionMark({ size: 48, color: "#7232f2" })}
                  </div>
                  <div className="name">
                    <b>Coming Soon</b>
                    <span>...</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="hero-border-top hidden md:block"></div>
        <div className="hero-border-left hidden md:block"></div>
        <div className="hero-border-right hidden md:block"></div>
      </div>
      <div className="hero-bg absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="hero-strip-top"></div>
        <div className="hero-strip-left"></div>
      </div>
    </section>
  );
};

export default HeroSection;
