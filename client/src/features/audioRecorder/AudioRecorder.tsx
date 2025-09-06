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
      alert('Ваш браузер не поддерживает Web Speech API. Используйте Chrome или Edge.');
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', minWidth: 350 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 48 }}>
        <Button onClick={startRecording} disabled={recording} color="#4f8cff" type="button">Start</Button>
        <Button onClick={stopRecording} disabled={!recording} color="#ff4f4f" type="button">Stop</Button>
        <Button onClick={handleTranslate} disabled={!transcript || loading} color="#ffc94f" type="button">Translate</Button>
        <span style={{ color: recording ? 'red' : 'transparent', fontWeight: 700, marginLeft: 8, transition: 'color 0.2s', minWidth: 90 }}>
          ● Recording...
        </span>
      </div>
      <div style={{ minHeight: 40, width: '100%', textAlign: 'left' }}>
        {transcript && (
          <div>
            <b>Распознанный текст:</b><br/>
            {transcript}
          </div>
        )}
      </div>
      <div style={{ minHeight: 28, width: '100%', textAlign: 'left' }}>
        {loading && <div>Переводим...</div>}
        {!loading && translated && (
          <div style={{ marginTop: 8 }}>
            <b>Перевод на испанский:</b><br/>
            {translated}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
