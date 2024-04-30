"use client";
import React, {
  ForwardRefExoticComponent,
  HTMLProps,
  PropsWithChildren,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./Slider.module.css";
import { useInView, observe } from "react-intersection-observer";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useHover, useIsClient, useMouse } from "@uidotdev/usehooks";
const SLIDER_PREFIX = "slider";

type SliderProps = Omit<HTMLProps<HTMLDivElement>, "onChange" | "ref"> & {
  onChange?: (value: number) => void;
  ref?: React.Ref<SliderRef>;
};

export type SliderRef = {
  next: () => void;
  prev: () => void;
};

interface SliderComposition extends ForwardRefExoticComponent<SliderProps> {
  Slide: (props: SlideProps) => JSX.Element;
}
const ForwardSlider = forwardRef<SliderRef, SliderProps>(
  ({ children, onChange }, ref) => {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [initialized, setInitialized] = useState(false);
    const [slides, setSlides] = useState<Element[]>([]);
    const next = () => {
      const nextSlide = currentSlide + 1;

      if (nextSlide >= slides.length) return;
      const element = slides[nextSlide];

      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentSlide(nextSlide);
    };
    const prev = () => {
      const prevSlide = currentSlide - 1;
      if (prevSlide < 0) return;
      slides[prevSlide].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setCurrentSlide(prevSlide);
    };

    useImperativeHandle(ref, () => ({ next, prev }), [next, prev]);

    useEffect(() => {
      const root = innerRef.current;
      if (!root) return;
      const slides = root.querySelectorAll(`[data-prefix="${SLIDER_PREFIX}"]`);
      const slidesArray = Array.from(slides);
      setSlides(slidesArray);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = slidesArray.indexOf(entry.target);
              if (initialized) onChange?.(index);
            }
          });
        },
        {
          root: innerRef.current,
          threshold: 0.5,
        }
      );
      slides.forEach((slide) => observer.observe(slide));
      setInitialized(true);

      return () => {
        slides.forEach((slide) => observer.unobserve(slide));
      };
    }, [React.Children.count(children)]);

    const [wrapperRef, hovering] = useHover();

    return (
      <div className={styles.sliderWrapper} ref={wrapperRef}>
        <div ref={innerRef} className={styles.slider}>
          <SliderProvider rootElement={innerRef.current}>
            {children}
          </SliderProvider>
        </div>
        <div
          onClick={next}
          className={`${styles.navButton} ${styles.navRight} ${
            hovering && styles.navButtonEnabled
          }`}
        >
          <MdChevronRight />
        </div>
        <div
          onClick={prev}
          className={`${styles.navButton} ${styles.navLeft} ${
            hovering && styles.navButtonEnabled
          }`}
        >
          <MdChevronLeft />
        </div>
      </div>
    );
  }
);

ForwardSlider.displayName = "Slider";

type SlideProps = React.HTMLProps<HTMLDivElement>;

const Slide = ({ children }: SlideProps) => {
  const id = useId();

  return (
    <div
      data-slide={id}
      data-prefix={`${SLIDER_PREFIX}`}
      className={styles.slide}
    >
      {children}
    </div>
  );
};

export const Slider = {
  ...ForwardSlider,
  Slide: Slide,
} as any as SliderComposition;

type SliderContextArgs = {
  rootElement?: HTMLElement | null;
  sliderId?: string;
};

const SliderContext = createContext<SliderContextArgs | null>(null);

const SliderProvider = ({
  children,
  rootElement,
  sliderId,
}: PropsWithChildren<SliderContextArgs>) => {
  return (
    <SliderContext.Provider value={{ rootElement, sliderId }}>
      {children}
    </SliderContext.Provider>
  );
};
