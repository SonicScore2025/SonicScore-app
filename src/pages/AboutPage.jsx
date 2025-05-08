import { GithubLogo, LinkedinLogo, Waveform } from "@phosphor-icons/react";
import aboutImage from "../assets/images/about.webp";
import pedramImage from "../assets/images/pedram.jpg";
import andreImage from "../assets/images/andre.jpg";

const AboutPage = () => {
  return (
    <div id="HomePage">
      <h1 className="text-3xl font-medium text-gray-500 flex items-center justify-center mt-5 mb-8 gap-3">
        <Waveform weight="duotone" className="text-purple-700" size={38} />
        About Sonic Score
      </h1>

      <div>
        <img
          src={aboutImage}
          alt="an image from a music festival"
          className="rounded-2xl opacity-70 aspect-square object-cover md:aspect-auto"
        />
      </div>

      <div className="border-l-[3px] border-purple-800 pl-6 md:ml-6 mt-14 mb-18 md:mb-28 md:pr-10">
        <h2 className="text-2xl font-bold flex items-center mb-6 gap-3 text-purple-800">
          What is Sonic Score?
        </h2>

        <div className="text-lg text-blue-900 [&_p]:mb-3">
          <p>
            Sonic Score is a web platform created for music lovers who want to
            discover, explore, and share their festival experiences. Our mission
            is to build a trusted list of the world's top music festivals,
            fueled by real feedback from real people.
          </p>
          <p>
            Users can rate festivals not just overall, but also across specific
            aspects like atmosphere, music quality, organization, safety,
            facilities, and the booking experience. This way, future
            festival-goers can see detailed insights — beyond just a single
            average score — and make better, more confident decisions about
            which events to attend.
          </p>
          <p>
            At Sonic Score, we believe that every festival has a story, and
            every attendee has a voice. Join the community, share your
            experiences, and help others find their next unforgettable festival
            adventure!
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold flex items-center mb-6 gap-3 text-purple-800">
          Who we are!
        </h2>
        <div className="flex flex-col md:flex-row md:gap-12">
          <div className="text-lg text-blue-900 mb-8 [&_p]:mb-3 md:w-5/6">
            <p>
              Sonic Score is a class project developed during the IronHack
              bootcamp by two passionate creators — Andre and Pedram.
            </p>
            <p>
              The idea for Sonic Score was born from a perfect combination of
              interests:
            </p>
            <p>
              Andre’s deep love for music and Pedram’s experience in user
              interface design. Together, they envisioned a platform where music
              lovers could discover the world’s best festivals, share their
              personal experiences, and help others make better choices.
            </p>
            <p>
              Built using React.js, styled with Tailwind CSS, and powered by
              Firebase Authentication and Realtime Database, Sonic Score is a
              reflection of creativity, collaboration, and a shared passion for
              both music and technology.
            </p>
            <p>
              This project brings together design thinking, real-world user
              needs, and the excitement of live music into one vibrant platform.
              It’s not just a class project — it's a dream turned into reality,
              created by two individuals driven by what they love.
            </p>
            <p>
              Project github repository:{" "}
              <a
                href="https://github.com/SonicScore2025/SonicScore-app"
                target="_blank"
                className="text-blue-800 hover:underline duration-300"
              >
                Click to visit.
              </a>
            </p>
          </div>
          <div className="flex gap-8 md:flex-col content-between md:w-1/6">
            <div className="flex flex-col items-center">
              <img
                src={andreImage}
                alt="Andre"
                className="rounded-full md:w-32"
              />
              <div className="flex gap-1 items-center justify-center mt-3 text-gray-500">
                <a
                  href="https://github.com/andrekaltenbach"
                  target="_blank"
                  className="hover:text-blue-800 duration-300"
                >
                  <GithubLogo size={24} weight="duotone" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={pedramImage}
                alt="Pedram"
                className="rounded-full md:w-32"
              />
              <div className="flex gap-1 items-center justify-center mt-3 text-gray-500">
                <a
                  href="https://github.com/iampedi"
                  target="_blank"
                  className="hover:text-blue-800 duration-300"
                >
                  <GithubLogo size={24} weight="duotone" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
