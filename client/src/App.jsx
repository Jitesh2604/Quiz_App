import Navbar from "./components/Navbar";
import LoginPage from "./pages/Login";
import BackgroundEffects from "./components/BackgroundEffects";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans relative overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <LoginPage />
        </div>
      </main>
    </div>
  )
}

export default App
