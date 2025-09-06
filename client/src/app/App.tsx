import "./App.css";
import AudioRecorder from "../features/audioRecorder/AudioRecorder";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Speak & Translate</h1>
      <p style={{ color: 'var(--text)', marginBottom: '2rem' }}>
        Record your speech and we'll translate it to Spanish
      </p>
      <AudioRecorder />
    </div>
  );
}

export default App;