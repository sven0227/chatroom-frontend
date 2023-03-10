import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .chat-messages {
    max-height: calc(100% - 45px);
  }
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
  
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  
  .top-side-bar img {
    display: block;
    width: 100%;
    height: calc(100% - 2px);
    border-radius: 10px;
    object-fit: cover;
  }

  .img-slider-box .swiper-pagination-bullet {
    background: rgb(66, 66, 66);
    width: 14px;
    height: 14px;
  }

  .top-side-bar .swiper-pagination-bullet {
    border: 2px solid #1d1c22;
    height: 1rem;
    width: 1rem;
    background: #1d1c22;
    margin: 0 0.5rem;
    cursor: pointer;
    border-radius: 8px;
    position: relative;
  }

  .top-side-bar .swiper-pagination-bullet::after {
    background: #1d1c22;
    border-radius: 4px;
    content: "";
    height: 0.5rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 0.5rem;
  }

  .top-side-bar .swiper-pagination-bullet-active {
    background: #ff7e94;
  }

  .top-side-bar .swiper-button-prev::after, .top-side-bar .swiper-button-next::after {
    font-size: 1.1875em;
    color: #ff7e94;
  }

  .top-side-bar {
    border-radius: 4px;   
  }

  .top-side-bar .swiper-button-prev, .top-side-bar .swiper-button-next {
    background: #343040;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 4px;
    transition: background-color .15s ease-out;
    padding-bottom: 2px;
    padding-left: 4px;
    top: 50%;
  }

  .top-side-bar {
    max-width: 920px;
    border-radius: 10px;
  }

  .slider-graphic {
    animation-fill-mode: forwards;
    background-size: contain!important;
    position: absolute;
    z-index: 6;
  }
  .slider-graphic-1 {
    animation: scale 2s;
    background: url('/images/gates-of-olympus.png') no-repeat 50%;
    height: 23.5625rem;
    left: 0;
    bottom: 0;
    transform: scale(1);
    width: 19.125rem;
  }
  .slider-graphic-2 {
    animation: delay 2s;
    background: url('/images/book-of-wild.png') no-repeat 50%;
    height: 16.5625rem;
    left: 10rem;
    bottom: 0;
    transform: scale(1);
    width: 14.125rem;
  }
  .slider-graphic-3 {
    animation: delay 4s;
    background: url('/images/dog-house.png') no-repeat 50%;
    height: 18.5625rem;
    right: 0rem;
    top: 0;
    transform: scale(1);
    width: 15.125rem;
  }
  .slider-graphic-4 {
    animation: delay 6s;
    background: url('/images/dog-house.png') no-repeat 50%;
    height: 10.5625rem;
    right: 0rem;
    bottom: 0;
    transform: scale(1);
    width: 9.125rem;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes scale {
    0% {
      transform: scale(0)
    }
    100% {
      transform: scale(1)
    }
  }
  @keyframes delay {
    0% {
      transform: scale(0)
    }
    50% {
      transform: scale(0)
    }
    100% {
      transform: scale(1)
    }
  }

  .timer-info {
    display: grid;
    -moz-column-gap: .5rem;
    column-gap: 0.5rem;
    grid-auto-flow: column;
    font-family: Inter;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 2.5rem;
  }

  .timer-info-col {
    display: grid;
    grid-auto-flow: column;
    -moz-column-gap: .25rem;
    column-gap: 0.25rem;
    position: relative;
  }

  .timer-info-col .value {
    border-radius: 5px;
    width: 2.5rem;
    color: #fff;
    text-align: center;
    position: relative;
    background: #fe617c;
    background-size: cover;
    background-position: 50%;
  }

  .timer-info-col .label {
    position: absolute;
    width: 100%;
    bottom: -2.25rem;
    font-size: .85rem;
    font-weight: 500;
    color: #f0f0f0;
    opacity: .85;
    text-align: center;
  }

  .raffle-unit {
    // background: #242329;
  }

  .raffle-hero-unit {
    text-align: center;
    // background-color: #241f2e;
    position: relative;
  }

  .raffle-hero-unit .inner {
    // background: rgba(36,35,41,.92);
    padding-top: 1rem;
    width: 100%;
    height: 100%;
    padding: 2rem;
    overflow: hiden;
    display: inline-grid;
    justify-content: center;
  }

  .raffle-hero-unit .inner .big-text {
    font-family: Rubik;
    font-weight: 900;
    text-transform: uppercase;
    color: #fe617c;
    font-size: 5rem;
    line-height: 5.25rem;
  }
  .raffle-hero-unit .inner .medium-text {
    font-family: Rubik;
    font-weight: 900;
    text-transform: uppercase;
    color: #fff;
    font-size: 2.4rem;
    line-height: 2.75rem;
  }
  .raffle-hero-unit .inner .small-text {
    max-width: 35rem;
    color: #f0f0f0;
    font-size: 14px;
    font-weight: 400;
    margin-top: 1rem;
  }
  .raffle-hero-unit .left-graphics {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 15rem;
    height: 10rem;
  }
  .raffle-hero-unit .right-graphics {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 15rem;
    height: 10rem;
  }
  .raffle-hero-unit .left-graphics .tree {
    background: url('/images/tree.svg') no-repeat;
    background-size: contain;
    background-position: 0 100%;
    width: 100%;
    height: 100%;
  }
  .raffle-hero-unit .left-graphics .snow {
    background: url('/images/snow.svg') no-repeat;
    background-size: contain;
    background-position: 0 100%;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: -2rem;
  }
  .raffle-hero-unit .left-graphics .tree:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    background: url('/images/tree_blur.svg') no-repeat;
    background-size: contain;
    background-position: 0 100%;
    width: 100%;
    height: 100%;
  }
  .raffle-hero-unit .right-graphics .gifts {
    background: url('/images/gifts.svg') no-repeat;
    background-size: contain;
    background-position: 100% 100%;
    width: 100%;
    height: 100%;
  }
  .raffle-hero-unit .right-graphics .gifts:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    background-size: contain;
    background-position: 100% 100%;
    width: 100%;
    height: 100%;
  }
  .raffle-hero-unit .right-graphics .snow {
    background: url('/images/snow.svg') no-repeat;
    background-size: contain;
    background-position: 100% 100%;
    transform: scaleX(-1);
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: -2rem;
  }
  .raffle-countdown {
    width: 100%;
    display: grid;
    justify-content: center;
    text-align: center;
    padding-bottom: 1.25rem;
    margin: 2rem 0;
  }
  @media (max-width: 1215px) {
    .raffle-hero-unit .inner .small-text {
      max-width: 30rem;
    }
    .raffle-hero-unit .left-graphics {
      width: 12.5rem;
      height: 8.25rem;
    }
    .raffle-hero-unit .right-graphics {
      width: 12.5rem;
      height: 8.25rem;
    }
    .raffle-hero-unit .left-graphics .snow {
      bottom: -1.25rem;
    }
    .raffle-hero-unit .right-graphics .snow {
      bottom: -1.25rem;
    }
  }
  @media (max-width: 1023px) {
    .raffle-hero-unit .inner .small-text {
      max-width: 25rem;
      font-size: .9rem;
    }
    
    .raffle-hero-unit .left-graphics {
      width: 10em;
      height: 6.66rem;
    }
    .raffle-hero-unit .right-graphics {
      width: 10em;
      height: 6.66rem;
    }
  }
  @media (max-width: 767px) {
    .raffle-hero-unit .inner .big-text {
      font-size: 2rem;
      line-height: 2rem;
      margin-bottom: 1rem;
    }
    .raffle-hero-unit .inner .medium-text {
      font-size: 2rem;
      line-height: 2rem;
      margin-bottom: 1rem;
    }
    .raffle-hero-unit .inner .small-text {
      margin: 1rem auto 0;
      max-width: 80%;
      text-shadow: none;
      font-size: .9rem;
    }
    .raffle-hero-unit .left-graphics {
      width: 7.5rem;
      height: 4.95rem;
    }
    .raffle-hero-unit .right-graphics {
      width: 7.5rem;
      height: 4.95rem;
    }
    .raffle-hero-unit .left-graphics .snow {
      bottom: -1rem;
    }
    .raffle-hero-unit .right-graphics .snow {
      bottom: -1rem;
    }
  }

  @media (max-width: 479px) {
    .raffle-hero-unit .inner .small-text {
      margin: 1rem auto 1.25rem;
      max-width: 70%;
    }
  }
`

export default GlobalStyle
