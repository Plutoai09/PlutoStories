import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import Payment from "./components/Payment";
import Aboutus from "./components/Aboutus";
import ConversationInterface from "./components/ConversationInterface";
import Login from "./components/Login";
import ElevenLabsWidget from "./components/ElevenLabsWidget";
import SandeepMaheshwari from "./components/SandeepMaheshwari";
import Checkout from "./components/Checkout";
import TnC from "./components/TnC";
import Privacy from "./components/Privacy";
import Homepage from "./components/Homepage";
import Contact from "./components/contact";
import Refund from "./components/refund";
import YTPlayer from "./components/YTPlayer";
import Loginyt from "./components/Loginyt";
import SleepPlayer from "./components/SleepPlayer";
import LoginSleep from "./components/LoginSleep";
import OnboardingFlow from "./components/OnboardingFlow";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import AppLaunch from "./components/AppLaunch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnboardingFlow />} />
        <Route path="/update" element={<ConversationInterface />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Loginyt />} />
        <Route path="/interact" element={<ElevenLabsWidget />} />
        <Route path="/artofconversation" element={<AudioPlayer />} />
        <Route path="/SandeepMaheshwari" element={<SandeepMaheshwari />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/terms" element={<TnC />} />
        <Route path="/privacy" element={<Privacy />} />
      
        <Route path="/contact" element={<Contact />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/youtube" element={<YTPlayer />} />
        <Route path="/deepsleep" element={<SleepPlayer />} />
        <Route path="/join" element={<LoginSleep />} />
        <Route path="/onboarding" element={<OnboardingFlow/>} />
        <Route path="/install" element={<PWAInstallPrompt/>} />
        <Route path="/app" element={<AppLaunch/>} />
      </Routes>
    </Router>
  );
}

export default App;
