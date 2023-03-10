/* eslint-disable */
import { useState, useEffect } from 'react';
import { LotteryResponse } from 'state/types'
import useSWR from 'swr'
import useIsRenderLotteryBanner from 'views/Home/components/Banners/hooks/useIsRenderLotteryBanner';

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useIsRenderLotteryBanner()
  const { data } = useSWR<LotteryResponse>(['currentLottery'])

  const getTime = () => {
    const time = parseInt(data.endTime) * 1000 - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    if(data){
        const interval = setInterval(() => getTime(), 1000);
    
        return () => clearInterval(interval);
    }
  }, [data]);

  return (
    <>
        <div className="raffle-countdown">
            <div className="timer-info">
                <div className="timer-info-col">
                    <div className="value">{Math.floor(days/10)}</div>
                    <div className="value">{days%10}</div>
                    <div className="label">Days</div>
                </div>
                <div className="timer-info-col">
                    <div className="seperator">:</div>
                </div>
                <div className="timer-info-col">
                    <div className="value">{Math.floor(hours/10)}</div>
                    <div className="value">{hours%10}</div>
                    <div className="label">Hours</div>
                </div>
                <div className="timer-info-col">
                    <div className="seperator">:</div>
                </div>
                <div className="timer-info-col">
                    <div className="value">{Math.floor(minutes/10)}</div>
                    <div className="value">{minutes%10}</div>
                    <div className="label">Minutes</div>
                </div>
                <div className="timer-info-col">
                    <div className="seperator">:</div>
                </div>
                <div className="timer-info-col">
                    <div className="value">{Math.floor(seconds/10)}</div>
                    <div className="value">{seconds%10}</div>
                    <div className="label">Seconds</div>
                </div>
            </div>
        </div>
    </>    
  );
};

export default Timer;