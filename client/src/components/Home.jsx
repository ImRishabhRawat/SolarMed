import Button from "./Button";
import { FiArrowUpRight } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Hero from "./Section/Hero";
import Marquee from "./Section/Marqee";
import Work from "./Section/Work";
import CTA from "./Section/CTA";

const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div className="relative w-full min-h-screen bg-[url('../../make.jpg')] bg-center bg-cover ">
        <div className="pt-32 md:pt-40 mx-auto max-w-7xl border-b-2">
          <div className="flex  justify-between w-full px-4 mt-4 mb-8">
            <p className="w-1/2 md:w-1/3 text-lg leading-[.9] tracking-normal font-thin text-zinc-600">
              We are committed to providing you with the best healthcare
              services. With over 500+ professionals on board, we connect you
              with experienced doctors across various specialties.
            </p>
            <div className=" md:border-2 border-zinc-300 md:rounded-full md:px-8 flex flex-col md:gap-4 items-center md:flex-row">
              <span className="flex -space-x-4 overflow-hidden">
                {["p1", "p2", "p3", "p4"].map((items, index) => {
                  return (
                    <img
                      key={index}
                      width={52}
                      height={52}
                      className="inline-block h-10 w-10 rounded-full"
                      src={`../../${items}.png`}
                      alt="person"
                    />
                  );
                })}
              </span>
              <span className="text-right md:text-center bold-16 md:bold-20 ml-3 text-zinc-600">
                over 500+ professionals on board
              </span>
            </div>
          </div>
          <div className=" w-full px-4 mb-8">
            <h1 className="relative font-['Helvetica_Now_Display'] text-6xl leading-[.8] md:text-8xl  md:leading-[.8] font-semibold text-zinc-900">
              Healthcare{" "}
              <span className="absolute  logo Wingdings font-bold md:text-8xl ">
                R{" "}
              </span>
              <br />
              for Personalized <br />
              Wellness solutions!
            </h1>
          </div>
          <div className="flex items-center justify-between w-full px-4 mb-8">
            <div className="left">
              {isLoggedIn ? (
                <Link to="/appointment">
                  <Button
                    text="Book a Consultation"
                    icon={<FiArrowUpRight />}
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <Button
                    text="Book a Consultation"
                    icon={<FiArrowUpRight />}
                  />
                </Link>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 right ">
              <Button icon={<FaFacebook />} />
              <Button icon={<RiInstagramFill />} />
              <Button icon={<FaTwitter />} />
            </div>
          </div>
        </div>
        <div className=" mt-4 mx-auto max-w-7xl border-t-2 border-zinc-300" />
      </div>
      <Hero />
      {/* <Marquee /> */}
      {/* <Work /> */}
      {/* <CTA /> */}
    </>
  );
};

export default Home;
