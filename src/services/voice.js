// Voice Interface - Jal Vani
class VoiceService {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
  }

  initialize(language = 'hi-IN') {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = language;
      this.recognition.interimResults = false;
      return true;
    }
    return false;
  }

  startListening(onResult, onError) {
    if (!this.recognition) {
      onError?.('Voice recognition not supported');
      return;
    }

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.isListening = false;
      onResult?.(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      onError?.(event.error);
    };

    this.recognition.start();
    this.isListening = true;
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text, language = 'hi-IN') {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 0.9;
    this.synthesis.speak(utterance);
  }

  processCommand(transcript, language = 'en') {
    const commands = {
      en: {
        'water quality': () => ({ action: 'navigate', to: 'citizen' }),
        'my crops': () => ({ action: 'navigate', to: 'farmer' }),
        'pump status': () => ({ action: 'navigate', to: 'fleet' }),
        'call technician': () => ({ action: 'service', type: 'request' })
      },
      hi: {
        'पानी की गुणवत्ता': () => ({ action: 'navigate', to: 'citizen' }),
        'मेरी फसल': () => ({ action: 'navigate', to: 'farmer' }),
        'पंप की स्थिति': () => ({ action: 'navigate', to: 'fleet' }),
        'तकनीशियन बुलाओ': () => ({ action: 'service', type: 'request' })
      },
      gu: {
        'પાણીની ગુણવત્તા': () => ({ action: 'navigate', to: 'citizen' }),
        'મારા પાક': () => ({ action: 'navigate', to: 'farmer' }),
        'પંપની સ્થિતિ': () => ({ action: 'navigate', to: 'fleet' })
      }
    };

    const langCommands = commands[language] || commands.en;
    const lowerTranscript = transcript.toLowerCase();

    for (const [key, handler] of Object.entries(langCommands)) {
      if (lowerTranscript.includes(key.toLowerCase())) {
        return handler();
      }
    }

    return { action: 'unknown', transcript };
  }
}

export default new VoiceService();
