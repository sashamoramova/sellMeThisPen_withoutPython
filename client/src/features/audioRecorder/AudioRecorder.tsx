import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import { translateText } from '../../entities/speach/api';

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const transcriptRef = useRef<string>('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support Web Speech API. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ru-RU';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' ';
        }
      }

      if (finalTranscript) {
        transcriptRef.current = (transcriptRef.current + ' ' + finalTranscript).trim();
        setTranscript(transcriptRef.current);
      }
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.onerror = (event: Event) => {
      console.error('Speech recognition error:', event);
      setRecording(false);
    };

    setRecognition(recognition);

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    setTranscript('');
    setTranslated(null);
    transcriptRef.current = '';
    
    if (recognition) {
      try {
        await recognition.start();
        setRecording(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        if (error instanceof Error && error.message.includes('already started')) {
          recognition.stop();
        }
      }
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setRecording(false);
    }
  };

  const handleTranslate = async () => {
    if (!transcript) return;
    setLoading(true);
    setTranslated(null);
    try {
      const { translated } = await translateText(transcript);
      setTranslated(translated);
    } catch (e) {
      setTranslated('Ошибка при переводе');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recorder-container">
      <div className="button-group">
        <Button 
          onClick={startRecording} 
          disabled={recording} 
          variant="primary" 
          type="button"
        >
          Start Recording
        </Button>
        <Button 
          onClick={stopRecording} 
          disabled={!recording} 
          variant="secondary" 
          type="button"
        >
          Stop
        </Button>
        <Button 
          onClick={handleTranslate} 
          disabled={!transcript || loading} 
          variant="accent" 
          type="button"
        >
          Translate
        </Button>
        <span className={`recording-indicator ${recording ? 'active' : ''}`}>
          Recording...
        </span>
      </div>

      {transcript && (
        <div className="text-container">
          <h3>Recognized Text:</h3>
          <p>{transcript}</p>
        </div>
      )}

      {loading && (
        <div className="text-container">
          <p>Translating...</p>
        </div>
      )}
      
      {!loading && translated && (
        <div className="text-container">
          <h3>Spanish Translation:</h3>
          <p>{translated}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
