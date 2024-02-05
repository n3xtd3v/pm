import GoodFace from "../images/LA-Tower-Screen Face PM2.5-12.png";
import ModerateFace from "../images/LA-Tower-Screen Face PM2.5-13.png";
import UnhealthyForSensitiveGroupFace from "../images/LA-Tower-Screen Face PM2.5-14.png";
import UnhealthyFace from "../images/LA-Tower-Screen Face PM2.5-15.png";
import VeryUnhealthyFace from "../images/LA-Tower-Screen Face PM2.5-16.png";

const AirCard = ({ title, aqi, pm }) => {
  return (
    <div className="flex flex-col justify-center gap-0.5 2xl:gap-1 lg:gap-1.5">
      <div className="flex-initial w-[190px] text-xs border-none rounded-t-md py-0.5 bg-[#303f49] text-white pl-2 2xl:text-6xl 2xl:w-[950px] 2xl:pl-24 2xl:py-2 2xl:rounded-t-3xl lg:text-5xl lg:w-[800px] lg:pl-[50px] lg:rounded-t-3xl">
        {title}
      </div>

      <div
        className="flex rounded-b-md 2xl:rounded-b-3xl lg:rounded-b-3xl"
        style={{
          color: "#ffffff",
          background:
            aqi <= 50
              ? `#a9d161`
              : aqi <= 100
              ? `#f5d160`
              : aqi <= 150
              ? `#f99756`
              : aqi <= 200
              ? `#f4676b`
              : aqi <= 300
              ? `#a17db6`
              : ``,
        }}
      >
        <div className="grow flex flex-col text-center">
          <p className="text-[9px] bg-[rgba(0,0,0,0.3)] w-full px-0.5 2xl:text-[45px] 2xl:px-2 lg:text-[40px]">
            PM 2.5 µg/m³
          </p>

          <div className="text-[45px] leading-none font-medium 2xl:text-[250px] lg:text-[150px]">
            {Math.trunc(pm)}
          </div>
        </div>

        <div className="grow flex flex-col text-center border-x border-[rgba(0,0,0,0.3)]">
          <p className="text-[9px] bg-[rgba(0,0,0,0.3)] w-full px-0.5 2xl:text-[45px] 2xl:px-2 lg:text-[40px]">
            AIR QUALITY INDEX
          </p>
          <div className="text-[45px] leading-none font-medium 2xl:text-[250px] lg:text-[150px]">
            {aqi}
          </div>
        </div>

        <div className="grow flex flex-col items-center text-center">
          <div className="text-[9px] bg-[rgba(0,0,0,0.3)] w-full px-0.5 2xl:text-[45px] 2xl:px-2 lg:text-[40px]">
            {aqi <= 50 ? (
              `GOOD`
            ) : aqi <= 100 ? (
              `MODERATE`
            ) : aqi <= 150 ? (
              <div className="text-[8px] lg:text-[40px] 2xl:text-[45px] leading-none">
                <div className="">UNHEALTHY</div>
                <div className="text-[5.5px] lg:text-[20px] 2xl:text-[22.5px]">
                  FOR SENSITIVE GROUP
                </div>
              </div>
            ) : aqi <= 200 ? (
              `UNHEALTHY`
            ) : aqi <= 300 ? (
              `VERY UNHEALTHY`
            ) : (
              ``
            )}
          </div>

          <img
            className="w-[50px] 2xl:w-[250px] lg:w-[150px]"
            src={
              aqi <= 50
                ? GoodFace
                : aqi <= 100
                ? ModerateFace
                : aqi <= 150
                ? UnhealthyForSensitiveGroupFace
                : aqi <= 200
                ? UnhealthyFace
                : aqi <= 300
                ? VeryUnhealthyFace
                : ``
            }
            alt="face"
          />
        </div>
      </div>
    </div>
  );
};

export default AirCard;
