import { CalendarHeart, Waveform } from "@phosphor-icons/react";

const AboutPage = () => {
  return (
    <div id="HomePage">
      <h1 className="text-3xl font-medium text-gray-500 flex items-center justify-center mt-5 mb-8 gap-3">
        <Waveform weight="duotone" className="text-purple-700" size={38} />
        About Sonic Score
      </h1>
    </div>
  );
};

export default AboutPage;
