import { useState, useEffect } from "react";

import GoodPM from "./images/LA-Tower-ScreenPM2.5-07.png";
import ModeratePM from "./images/LA-Tower-ScreenPM2.5-08.png";
import UnhealthyForSensitiveGroupPM from "./images/LA-Tower-ScreenPM2.5-09.png";
import UnhealthyPM from "./images/LA-Tower-ScreenPM2.5-10.png";
import VeryUnhealthyPM from "./images/LA-Tower-ScreenPM2.5-11.png";
import AirCard from "./components/AirCard";

function App() {
  const [airInSideData, setAirInSideData] = useState({
    AQI_CN: "" || 0,
    PM2_5: "" || 0,
    Status_Text: "" || "STATUS",
  });

  const [airOutSideData, setAirOutSideData] = useState({
    AQI_CN: "" || 0,
    PM2_5: "" || 0,
    Status_Text: "" || "STATUS",
  });

  const [time, setTime] = useState("");

  const aqiPMs = [
    { image: GoodPM },
    { image: ModeratePM },
    { image: UnhealthyForSensitiveGroupPM },
    { image: UnhealthyPM },
    { image: VeryUnhealthyPM },
  ];

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();

  useEffect(() => {
    const time = new Date();

    const timeOutime = setTimeout(() => {
      let getTime = time.toTimeString();
      setTime((time) => (time = getTime));
    }, 1000);

    return () => {
      clearTimeout(timeOutime);
    };
  }, [time]);

  useEffect(() => {
    let airInSideDataTimeout = setTimeout(async () => {
      const res = await fetch("http://10.1.20.36:9090/api/airin");
      const data = await res.json();
      const { air } = data;

      setAirInSideData((airInSideData) => ({
        ...airInSideData,
        AQI_CN: air.AQI_CN,
        PM2_5: air.PM2_5,
        Status_Text: air.Status_Text,
      }));
    }, 10000);

    return () => {
      clearTimeout(airInSideDataTimeout);
    };
  }, [airInSideData]);

  useEffect(() => {
    let airOutSideDataTimeout = setTimeout(async () => {
      const res = await fetch("http://10.1.20.36:9090/api/airout");
      const data = await res.json();
      const { air } = data;

      setAirOutSideData((airOutSideData) => ({
        ...airOutSideData,
        AQI_CN: air.AQI_CN,
        PM2_5: air.PM2_5,
        Status_Text: air.Status_Text,
      }));
    }, 10000);

    return () => {
      clearTimeout(airOutSideDataTimeout);
    };
  }, [airOutSideData]);

  return (
    <div className="flex justify-center gap-0.5 p-1 bg-white h-screen w-screen text-[#303f49] 2xl:p-14 2xl:justify-center lg:flex-col 2xl:flex-row 2xl:gap-2 lg:p-10 lg:gap-6 lg:justify-center">
      <div className="flex flex-col justify-center items-center font-medium max-sm:w-[140px] 2xl:gap-40 2xl:w-[500px]">
        <div className="flex flex-col items-center lg:gap-0 2xl:gap-6">
          <p className="2xl:text-7xl lg:text-8xl">
            {month[d.getMonth()]} {d.getDate()}
          </p>

          <p className="text-4xl 2xl:text-9xl lg:text-9xl">
            {time.slice(0, 5)}
          </p>
        </div>

        <div className="flex flex-col justify-center text-center gap-1 2xl:gap-4 lg:hidden 2xl:flex">
          <div className="rounded-xl bg-[#303f49] text-white text-xs 2xl:text-5xl 2xl:rounded-full">
            AQI Level
          </div>

          <div>
            {aqiPMs.map((api, index) => (
              <img key={index} src={api.image} alt="pm" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3 lg:gap-6 max-sm:gap-3">
        <AirCard
          title={`MedPark Hospital Building`}
          aqi={airInSideData.AQI_CN}
          pm={airInSideData.PM2_5}
        />

        <AirCard
          title={`Khlong Toei District`}
          aqi={airOutSideData.AQI_CN}
          pm={airOutSideData.PM2_5}
        />
      </div>

      <div className="hidden lg:flex lg:flex-col lg:text-center lg:gap-1 2xl:hidden">
        <div className="bg-[#303f49] text-white lg:rounded-full lg:text-7xl lg:py-1">
          AQI Level
        </div>

        <div>
          {aqiPMs.map((api, index) => (
            <img key={index} src={api.image} alt="pm" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
