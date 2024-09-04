import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ maxWidth: "100%", height: "100vh" }}>
      <div className="bg-slate-600 pl-20 pb-12 max-md:pl-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[43%] max-md:w-full max-md:ml-0">
            <span className="flex flex-col items-stretch mt-8 max-md:max-w-full max-md:mt-10">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  loading="lazy"
                  alt=""
                  srcSet="/favicon.png"
                  className="aspect-[1.71] object-contain object-center w-[113px] overflow-hidden max-w-full self-start"
                />
                <h1 className="text-white">Research Sync</h1>
              </div>
              <div className="text-white text-6xl leading-[68px] mt-40 max-md:max-w-full max-md:text-4xl max-md:leading-10 max-md:mt-10">
                ResearchCollab: Unifying Collaboration Efforts
              </div>
              <div className="text-white leading-6 mt-28 max-md:max-w-full max-md:mt-10">
                Manage your research and collaborate through an all-in-one
                platform.
              </div>
              <div className="items-stretch flex gap-5 mt-16 pr-2.5 pb-3 self-start max-md:mt-10">
                <Link to={"/login"} className="text-white text-state">
                  <button className="bg-white text-slate-600 text-center text-xs leading-5 tracking-[2px] uppercase whitespace-nowrap rounded grow justify-center items-stretch px-5 py-3.5 max-md:px-5">
                    Log In
                  </button>
                </Link>
                <Link to={"/signup"} className="text-white">
                  <button className="bg-white text-slate-600 text-center text-xs leading-5 tracking-[2px] uppercase whitespace-nowrap items-stretch rounded border grow justify-center px-5 py-3.5 border-solid border-slate-600">
                    Sign up
                  </button>
                </Link>
              </div>
                
                
            </span>
          </div>
          <div className="flex flex-col items-stretch w-[57%] ml-5 max-md:w-full max-md:ml-0">
            <div className=" bg-opacity-30 flex flex-col w-full pr-7 pt-11 items-start max-md:max-w-full max-md:mt-10 max-md:pr-5">
              <div className="flex w-full  items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                <div className="justify-between items-center flex gap-5 my-auto pr-20 py-1 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <span className="justify-between items-stretch flex gap-5 my-auto max-md:max-w-full max-md:flex-wrap">
                    <div className="text-white font-bold  text-xm leading-5 tracking-[2px] uppercase grow whitespace-nowrap">
                      HOME
                    </div>
                    <div className="text-white text-xm leading-5 tracking-[2px] uppercase">
                      PROFILE
                    </div>
                    <div className="text-white text-xm leading-5 tracking-[2px] uppercase">
                      PRICING
                    </div>
                    <div className="text-white text-xm leading-5 tracking-[2px] uppercase">
                      PROJECTS{" "}
                    </div>
                    <div className="text-white text-xm leading-5 tracking-[2px] uppercase">
                      REFERNECES
                    </div>
                    <div className="text-white text-xm leading-5 tracking-[2px] uppercase grow whitespace-nowrap">
                      PLAGARISM_CHECKER
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex-col overflow-hidden self-stretch relative flex min-h-[654px] mt-15 pl-20 pr-11 py-12 items-end max-md:max-w-full max-md:mt-10 max-md:px-5">
                <img
                  loading="lazy"
                  alt=""
                  style={{ objectFit: "contain" }}
                  srcSet="https://img.freepik.com/free-photo/group-people-working-out-business-plan-office_1303-15861.jpg?w=996&t=st=1705778068~exp=1705778668~hmac=0541ce986ebb8771344d705cdfc58209bbe426da3b706ea105682848ad30868a"
                  className="absolute h-full w-full object-cover object-center inset-0"
                />
                <div className="relative flex w-[13px] shrink-0 h-[13px] flex-col mt-52 rounded-[50%] max-md:mt-10" />
                <div className="relative flex w-[13px] shrink-0 h-2 flex-col mt-5 rounded-[50%]" />
                <div className="relative flex w-[13px] shrink-0 h-2 flex-col mt-5 rounded-[50%]" />
                <div className="relative flex w-[13px] shrink-0 h-2 flex-col mt-5 mb-48 rounded-[50%] max-md:mb-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
