import { useEffect, useState } from "react";

let recognition: any = null;

if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "yue-Hant-HK";
}

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log("onresult event:", event);
      setText(event.results[0][0].transcript);
      recognition.stop();
      setIsListening(false);
    };
  });

  const startListening = () => {
    console.log("startListening");
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    console.log(recognition.onspeechend);

    setIsListening(false);
    recognition.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechRecognition;
