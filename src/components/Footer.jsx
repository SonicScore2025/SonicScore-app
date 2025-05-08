import { Waveform } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <div className="Footer p-5 border-t border-gray-100">
      <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-1">
        <Waveform className="text-gray-500" size={20} />
        Sonic Score 2025. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
