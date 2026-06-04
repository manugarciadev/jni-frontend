"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";
import { useEffect, useRef } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = ({ banner: bannerData, brands }) => {
  const titleRef = useRef(null);
  const cursorRef = useRef(null);
  const paintRef = useRef(null);

  // Verses logo images
  const versesLogos = [
    "/images/verses_logo/v1.png",
    "/images/verses_logo/v2.png",
    "/images/verses_logo/v3.png",
    "/images/verses_logo/v4.png",
    "/images/verses_logo/v5.png",
  ];

  useEffect(() => {
    const ctx2 = gsap.context(() => {
      const banner = document.querySelector(".banner");
      const bannerBg = document.querySelector(".banner-bg");
      const header = document.querySelector(".header");
      const tl = gsap.timeline();
      tl.fromTo(
        ".banner-img",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
        }
      );

      const paintEl = paintRef.current;
      if (paintEl) {
        gsap.fromTo(
          paintEl,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out",
          }
        );
      }

      // typing headline
      const titleText = "Juventude Nazareza de Achada Santo Antonio";
      const titleEl = titleRef.current;
      const cursorEl = cursorRef.current;
      if (titleEl) {
        titleEl.textContent = "";
        titleText.split("").forEach((char, index) => {
          gsap.delayedCall(index * 0.06, () => {
            titleEl.textContent += char;
          });
        });
      }
      if (cursorEl) {
        gsap.to(cursorEl, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      //parallax banner
      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: () => `top ${header.clientHeight}`,
          scrub: true,
        },
      });

      const position = (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;
      parallaxTl
        .fromTo(
          bannerBg,
          {
            y: 0,
          },
          {
            y: -position,
          }
        )
        .fromTo(
          ".banner-bg .circle",
          {
            y: 0,
          },
          {
            y: position,
          },
          "<"
        );
    });

    return () => ctx2.revert();
  }, []);

  return (
    <section className="section banner pt-0">
      <div className="container-xl">
        <div className="relative">
          <div className="bg-theme banner-bg col-12 absolute left-0 top-0">
            <Circle
              className="circle left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle
              className="circle left-[2.5%] top-[29%]"
              width={85}
              height={85}
            />
            <Circle
              className="circle bottom-[48%] left-[22%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle bottom-[37%] left-[15%]"
              width={47}
              height={47}
              fill={false}
            />
            <Circle
              className="circle bottom-[13%] left-[6%]"
              width={62}
              height={62}
              fill={false}
            />
            <Circle
              className="circle right-[12%] top-[15%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle right-[2%] top-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="circle right-[19%] top-[48%]"
              width={37}
              height={37}
              fill={false}
            />
            <Circle
              className="circle right-[33%] top-[54%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle bottom-[20%] right-[3%]"
              width={65}
              height={65}
            />
          </div>
    <div className="row overflow-hidden rounded-2xl">
  <div className="col-12">
    <div className="row relative justify-center pt-24 pb-10">
      <div className="col-10 flex flex-col items-center justify-center mb-4 mt-8">
        <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-1 max-w-4xl">
          <span ref={titleRef}></span>
          <span
            ref={cursorRef}
            className="inline-block ml-2 h-10 w-[2px] bg-current"
          ></span>
        </h1>
        <div className="mb-0 w-full max-w-4xl" ref={paintRef}>
          <ImageFallback
            className="mx-auto w-full"
            src="/images/paint_banner.png"
            width={1200}
            height={320}
            priority={true}
            alt="Paint banner"
          />
        </div>
       <ImageFallback
  className="banner-img w-full max-w-3xl -mt-16"
  src={bannerData.image}
  width={1170}
  height={666}
  priority={true}
  alt=""
/>
      </div>
    </div>
  </div>
</div>
          <div className="row border-y border-border py-5 mt-20 relative z-10">
            <div className="animate from-right col-12">
              <Swiper
                loop={true}
                slidesPerView={3}
                breakpoints={{
                  992: {
                    slidesPerView: 5,
                  },
                }}
                spaceBetween={30}
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
              >
                {versesLogos.map((logo, index) => (
                  <SwiperSlide
                    className="h-40 cursor-pointer px-6 py-6 grayscale transition hover:grayscale-0 lg:px-10"
                    key={"logo-" + index}
                  >
                    <div className="relative h-full">
                      <ImageFallback
                        className="object-contain"
                        src={logo}
                        sizes="100vw"
                        alt=""
                        fill={true}
                        priority={true}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
