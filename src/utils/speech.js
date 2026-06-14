export const speak = (text, rate = 0.85, pitch = 1.0) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = rate;   // using the passed rate for flexibility
    utterance.pitch = pitch;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const japaneseVoices = voices.filter(v => v.lang.includes("ja"));

    if (japaneseVoices.length > 0) {
      const bestVoice =
        japaneseVoices.find(v => v.name.includes("Natural")) ||
        japaneseVoices.find(v => v.name.includes("Online")) ||
        japaneseVoices.find(v => v.name.includes("Nanami")) ||
        japaneseVoices[0];

      utterance.voice = bestVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, 100);
};
