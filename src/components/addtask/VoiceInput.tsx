import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

interface VoiceInputProps {
  onTranscriptChange: (text: string) => void;
  transcript: string;
}

export function VoiceInput({ onTranscriptChange, transcript }: VoiceInputProps) {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setIsListening(true);
      resetSilenceTimer();
    };

    rec.onresult = (event: any) => {
      resetSilenceTimer();
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const currentText = finalTranscript || interimTranscript;
      if (currentText.trim()) {
        onTranscriptChange(currentText);
      }
    };

    rec.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };

    recognitionRef.current = rec;

    return () => {
      if (rec) rec.abort();
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, []);

  const resetSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    // Auto stop after 2s of silence
    silenceTimerRef.current = setTimeout(() => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }, 2000);
  };

  const toggleListening = () => {
    if (!isSupported || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    } else {
      onTranscriptChange('');
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Start recognition failed:', err);
      }
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-amber-50 border border-warning/20 border-0.5 rounded-xl p-4 flex items-start space-x-3 text-warning">
        <MicOff className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-semibold block">Voice input requires Chrome</span>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Speech Recognition API is not supported in this browser. Please use Google Chrome or type your task details manually in Text mode.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center p-6 bg-surface-alt rounded-xl border border-border border-0.5 relative overflow-hidden">
        {/* Mic Circle Button */}
        <button
          type="button"
          onClick={toggleListening}
          className={`h-20 w-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10 ${
            isListening
              ? 'bg-primary text-white animate-pulse-ring'
              : 'bg-white border border-border border-0.5 text-text-secondary hover:bg-surface-alt hover:text-text-primary'
          }`}
        >
          <Mic className={`h-8 w-8 ${isListening ? 'animate-pulse' : ''}`} />
        </button>

        {/* Listening Status */}
        <div className="mt-4 h-6 flex items-center space-x-1.5 text-xs font-medium">
          {isListening ? (
            <div className="flex items-center space-x-1 text-primary">
              <span>Listening</span>
              <span className="flex space-x-0.5">
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce-dot" style={{ animationDelay: '0s' }} />
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce-dot" style={{ animationDelay: '0.15s' }} />
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce-dot" style={{ animationDelay: '0.3s' }} />
              </span>
            </div>
          ) : (
            <span className="text-text-secondary">Tap microphone to dictate task</span>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-text-secondary">Dictated Text</label>
        <textarea
          value={transcript}
          onChange={(e) => onTranscriptChange(e.target.value)}
          placeholder="Dictated words will appear here... you can edit this text manually before saving."
          className="w-full input-field h-[120px] p-3 text-xs leading-relaxed resize-none"
        />
      </div>
    </div>
  );
}
export default VoiceInput;
