import { Waveform } from "@phosphor-icons/react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-96">
      <Waveform
        size={24}
        className="animate-ping text-purple-800"
        weight="bold"
      />
    </div>
  );
};
export default Loading;
