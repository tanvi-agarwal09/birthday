import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Heart, Star, Camera, Sparkles, X, Play, Pause, ChevronRight, ChevronLeft, Gift, Wind, Trophy, Check } from "lucide-react";
import confetti from "canvas-confetti";

// --- ASSETS & CONFIGURATION ---
const CONFIG = {
  name: "Harshita",
  age: 13,
  birthDate: "2012-12-03", // YYYY-MM-DD
  
  // MAIN HERO PHOTO
  heroImage: "/star.JPG", 
  
  // 13 REASONS
  reasons: [
    { text: "Your smile lights up the entire room! ✨", img: "/curtain.jpg" },
    { text: "You are officially a TEENAGER! 1️⃣3️⃣", img: "/nightterace.JPG" },
    { text: "You give the absolute best hugs 🤗", img: "/Screenshot 2025-12-03 at 2.01.19 AM.png" },
    { text: "You have the coolest fashion sense 👗", img: "/Screenshot 2025-12-03 at 1.59.04 AM.png" },
    { text: "You're smarter than you know 🧠", img: "/IMG_4330.JPG" },
    { text: "You make boring days fun 🎉", img: "/Screenshot 2025-12-03 at 1.55.51 AM.png" },
    { text: "You're kinda kind 🐾", img: "/IMG_4726.JPG" },
    { text: "Your laugh is contagious 😂", img: "/Screenshot 2025-12-03 at 1.59.51 AM.png" },
    { text: "You are brave and strong 🦁", img: "/sunset.JPG" },
    { text: "You are creative and artistic 🎨", img: "/Screenshot 2025-12-03 at 1.53.17 AM.png" },
    { text: "You're the best sister in the world 👯‍♀️", img: "/e44601fe-244a-422b-8f7b-58bce5057d04.JPG" },
    { text: "You have amazing taste in music 🎵", img: "/Screenshot 2025-12-03 at 1.54.46 AM.png" },
    { text: "You are simply YOU, and that's enough! 💖", img: "/Screenshot 2025-12-03 at 1.54.29 AM.png" }
  ],
  
  // QUIZ DATA
  quiz: [
    { q: "What is Harshita's favorite color?", options: ["Pink", "Blue", "Black", "Purple"], answer: 2 },
    { q: "What does she love to eat most?", options: ["Pizza", "Chocolate", "Sushi", "Ice Cream"], answer: 3 },
    { q: "Who is her favorite sibling? (Hint: YOU)", options: ["Me!", "Me!", "Me!", "Me!"], answer: 0 }
  ],

  // GALLERY IMAGES
  galleryImages: [
    "/Screenshot 2025-12-03 at 1.56.35 AM.png",
    "/Screenshot 2025-12-03 at 1.56.50 AM.png",
    "/Screenshot 2025-12-03 at 1.57.01 AM.png",
    "/Screenshot 2025-12-03 at 1.57.12 AM.png",
    "/Screenshot 2025-12-03 at 1.57.21 AM.png",
    "/Screenshot 2025-12-03 at 1.57.29 AM.png",
    "/Screenshot 2025-12-03 at 1.58.44 AM.png",
    "/Screenshot 2025-12-03 at 1.58.54 AM.png",
    "/IMG_0947.JPG",
    "/Screenshot 2025-12-03 at 1.59.14 AM.png",
    "/Screenshot 2025-12-03 at 1.59.24 AM.png",
    "/Screenshot 2025-12-03 at 1.59.33 AM.png",
    "/Screenshot 2025-12-03 at 1.59.42 AM.png",
    "/IMG_0537.JPG",
    "/Screenshot 2025-12-03 at 2.00.02 AM.png",
    "/Screenshot 2025-12-03 at 2.00.12 AM.png",
    "/Screenshot 2025-12-03 at 2.00.22 AM.png",
    "/Screenshot 2025-12-03 at 2.00.32 AM.png",
    "/Screenshot 2025-12-03 at 2.00.41 AM.png",
    "/Screenshot 2025-12-03 at 2.00.57 AM.png",
    "/Screenshot 2025-12-03 at 2.01.05 AM.png",
    "/IMG_0562.JPG",
    "/Screenshot 2025-12-03 at 2.01.27 AM.png",
    "/Screenshot 2025-12-03 at 2.01.36 AM.png",
    "/Screenshot 2025-12-03 at 2.01.43 AM.png",
    "/213.JPG",
    "/Screenshot 2025-12-03 at 1.55.15 AM.png",
    "/yacht.JPG",
    "/IMG_0046.JPG",
    "/award.JPG"
  ]
};

// --- STYLES ---
const styles = {
  glass: "bg-white/70 backdrop-blur-lg border border-white/50 shadow-xl",
  sprinkle: "absolute w-2 h-2 rounded-full opacity-80"
};

// --- COMPONENTS ---

const Background = () => {
  // Use lazy state initialization to generate random values once on mount
  const [floatingItems] = useState(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      emoji: ["🦋", "❤️", "✨", "🌸", "💖", "🎂"][Math.floor(Math.random() * 6)],
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 20,
      rotate: Math.random() * 360
    }))
  );

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100" />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], x: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl"
      />

      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: window.innerHeight + 100, 
            opacity: [0, 1, 1, 0],
            rotate: item.rotate 
          }}
          transition={{ 
            duration: item.duration, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "linear"
          }}
          className="absolute text-2xl"
          style={{ left: `${item.left}vw` }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio(CONFIG.musicUrl));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    return () => audio.pause();
  }, []);

  const togglePlay = () => {
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => console.log("Interaction needed first"));
    setPlaying(!playing);
  };

  return (
    <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="fixed bottom-6 right-6 z-50">
      <button onClick={togglePlay} className={`p-4 rounded-full shadow-lg border-2 border-pink-200 transition-all transform hover:scale-110 flex items-center gap-2 ${playing ? 'bg-pink-500 text-white animate-pulse' : 'bg-white/80 text-pink-500'}`}>
        {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
      </button>
    </motion.div>
  );
};

const LiveAgeTracker = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const birth = new Date(CONFIG.birthDate);
      const now = new Date();
      const diff = now - birth;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 text-center mt-8">
      {[
        { label: "Days", val: time.days },
        { label: "Hours", val: time.hours },
        { label: "Mins", val: time.minutes },
        { label: "Secs", val: time.seconds }
      ].map((item, i) => (
        <div key={i} className="bg-white/50 backdrop-blur-sm p-3 rounded-xl min-w-[80px] shadow-sm border border-white">
          <div className="text-xl md:text-2xl font-bold text-slate-700">{item.val}</div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

const EnhancedCake = ({ onComplete }) => {
  const [candles, setCandles] = useState(Array(13).fill(true)); 
  // Use lazy state initialization for sprinkles too
  const [sprinkles] = useState(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      top: Math.random() * 40 - 50,
      left: Math.random() * 200 + 20,
      color: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FFFFFF'][Math.floor(Math.random() * 4)]
    }))
  );

  const blowCandles = () => {
    const litIndices = candles.map((isLit, i) => isLit ? i : -1).filter(i => i !== -1);
    if (litIndices.length > 0) {
      const randomIdx = litIndices[Math.floor(Math.random() * litIndices.length)];
      const newCandles = [...candles];
      newCandles[randomIdx] = false;
      setCandles(newCandles);
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.7 }, colors: ['#FFD700', '#FFA500'] });
      if (newCandles.every(c => !c)) setTimeout(onComplete, 1200);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      <div className="relative mt-24 mb-10 group cursor-pointer transition-transform hover:scale-105 duration-300" onClick={blowCandles}>
        {/* Cake Base Layer */}
        <div className="w-72 h-24 bg-[#5D4037] rounded-b-xl relative shadow-2xl border-b-8 border-[#3E2723] z-10">
          <div className="absolute -top-10 left-4 right-4 h-20 bg-[#795548] border-b-4 border-[#4E342E] rounded-md z-0" />
          
          {/* Frosting Drips */}
          <div className="absolute -top-14 w-full h-12 bg-pink-300 rounded-t-xl z-20 shadow-sm" />
          <div className="absolute -top-4 w-full flex justify-around z-20">
             {[...Array(7)].map((_, i) => (
                <div key={i} className="w-8 h-12 bg-pink-300 rounded-b-full" />
             ))}
          </div>

          {/* Sprinkles */}
          {sprinkles.map((sprinkle) => (
            <div key={sprinkle.id} className={styles.sprinkle} style={{
              top: sprinkle.top + "px",
              left: sprinkle.left + "px",
              backgroundColor: sprinkle.color
            }} />
          ))}

          {/* Cherries */}
          <div className="absolute -top-16 w-full flex justify-around z-20 px-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-red-500 rounded-full shadow-inner border border-red-700 relative">
                <div className="absolute -top-2 right-2 w-3 h-4 border-r-2 border-t-2 border-green-700 rounded-tr-full" />
              </div>
            ))}
          </div>

          <div className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-pink-100 font-bold font-serif text-4xl opacity-90 drop-shadow-md z-30">
            {CONFIG.age}
          </div>
        </div>

        {/* 13 Candles */}
        <div className="absolute -top-28 left-0 w-full flex justify-center flex-wrap gap-2 z-10 px-2">
          {candles.map((isLit, i) => (
            <div key={i} className="flex flex-col items-center" style={{ marginTop: i % 2 === 0 ? '10px' : '0px' }}>
              <motion.div 
                animate={{ opacity: isLit ? 1 : 0, scale: isLit ? [1, 1.2, 1] : 0 }}
                transition={{ duration: 0.5, repeat: isLit ? Infinity : 0 }}
                className="w-3 h-5 bg-yellow-400 rounded-[50%] shadow-[0_0_20px_#FFA500] mb-1"
              />
              <div className="w-2 h-10 bg-gradient-to-b from-blue-300 to-white border border-slate-300 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
      
      <motion.button 
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={blowCandles}
        className="mt-6 bg-slate-800 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-slate-700 transition-colors"
      >
        <Wind className="w-5 h-5" /> 
        Blow Candles!
      </motion.button>
    </div>
  );
};

const ReasonCarousel = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % CONFIG.reasons.length);
  const prev = () => setIndex((prev) => (prev - 1 + CONFIG.reasons.length) % CONFIG.reasons.length);

  return (
    <div className="max-w-4xl mx-auto w-full relative group">
      <div className={`${styles.glass} rounded-[3rem] overflow-hidden min-h-[500px] flex flex-col md:flex-row relative transition-all duration-500`}>
        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-100 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={CONFIG.reasons[index].img} 
              alt="Reason" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-4 py-1 rounded-full text-sm font-bold text-slate-700 shadow-sm">
            Reason #{index + 1}
          </div>
        </div>

        {/* Text Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center relative z-10">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Heart className="w-32 h-32 text-pink-500" />
          </div>
          <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 mb-6 drop-shadow-sm" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed font-serif">
                "{CONFIG.reasons[index].text}"
              </h3>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex gap-4 mt-auto">
            <button onClick={prev} className="p-3 rounded-full bg-slate-100 hover:bg-pink-100 text-slate-600 hover:text-pink-600 transition-colors shadow-sm">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={next} className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-pink-600 transition-colors flex items-center gap-2 shadow-lg">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizGame = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (idx) => {
    setSelected(idx);
    const isCorrect = idx === CONFIG.quiz[currentQ].answer;
    
    if (isCorrect) {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setSelected(null);
      if (currentQ < CONFIG.quiz.length - 1) {
        setCurrentQ(c => c + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <div className={`${styles.glass} rounded-3xl p-8 max-w-2xl mx-auto border-4 border-pink-100/50`}>
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800">The Sister Quiz!</h3>
        <p className="text-slate-500">How well do you know yourself? 😉</p>
      </div>

      {!showResult ? (
        <div>
          <div className="flex justify-between text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">
            <span>Question {currentQ + 1} / {CONFIG.quiz.length}</span>
            <span>Score: {score}</span>
          </div>
          <h4 className="text-xl font-bold text-slate-700 mb-6">{CONFIG.quiz[currentQ].q}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONFIG.quiz[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className={`p-4 rounded-xl font-bold transition-all transform hover:scale-102 border-b-4 ${
                  selected === null 
                    ? "bg-slate-50 hover:bg-white border-slate-200 text-slate-700 shadow-sm"
                    : idx === CONFIG.quiz[currentQ].answer
                      ? "bg-green-100 text-green-700 border-green-300"
                      : selected === idx
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "opacity-50 bg-slate-50 border-transparent"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <h2 className="text-4xl font-bold text-pink-500 mb-4">Quiz Complete!</h2>
          <p className="text-2xl text-slate-700 mb-6">You got {score} out of {CONFIG.quiz.length} correct!</p>
          <button onClick={() => {setShowResult(false); setCurrentQ(0); setScore(0);}} className="mt-6 px-6 py-2 bg-pink-100 text-pink-600 rounded-full font-bold hover:bg-pink-200 transition-colors">Play Again</button>
        </div>
      )}
    </div>
  );
};

const GiftBox = () => {
    const [opened, setOpened] = useState(false);
    const [claimed, setClaimed] = useState({}); // Track claimed coupons

    const coupons = [
        { title: "PIZZA PARTY 🍕", desc: "One large pizza of your choice" },
        { title: "WAFFLE DATE 🧇", desc: "Belgian waffles with extra toppings" },
        { title: "DIMSUM TREAT 🥟", desc: "Cream cheese dimsum on me" },
        { title: "SHOPPING SPREE 👗", desc: "New clothes! (Budgets apply 😉)" }
    ];

    const toggleClaim = (index) => {
        setClaimed(prev => {
            const isNowClaimed = !prev[index];
            if (isNowClaimed) {
                // Trigger mini confetti for this specific action
                 confetti({
                    particleCount: 40,
                    spread: 50,
                    origin: { y: 0.7 },
                    colors: ['#22c55e', '#a3e635'] // Green colors
                });
            }
            return { ...prev, [index]: isNowClaimed };
        });
    };

    return (
        <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">🎁 Special Gifts For You</h2>
            <div className="flex justify-center">
                {!opened ? (
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { setOpened(true); confetti(); }}
                        className="cursor-pointer relative"
                    >
                        <div className="w-48 h-48 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-2xl flex items-center justify-center border-4 border-red-700 relative z-10">
                            <div className="absolute inset-x-0 h-8 bg-yellow-400" />
                            <div className="absolute inset-y-0 w-8 bg-yellow-400" />
                            <Gift className="w-24 h-24 text-white z-20" />
                        </div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-16 bg-red-600 rounded-full z-0" />
                        <p className="mt-6 text-slate-500 font-bold animate-bounce">Click to Open!</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-yellow-300 max-w-md w-full"
                    >
                        <h3 className="text-2xl font-bold text-pink-600 mb-2">🎉 SURPRISE! 🎉</h3>
                        <p className="text-slate-500 text-sm mb-6">Tap a coupon to claim it!</p>
                        
                        <div className="grid gap-4 max-h-96 overflow-y-auto w-full">
                            {coupons.map((coupon, i) => {
                                const isClaimed = claimed[i];
                                return (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        onClick={() => toggleClaim(i)}
                                        className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer relative overflow-hidden ${
                                            isClaimed 
                                                ? "bg-green-50 border-green-400 opacity-60" 
                                                : "bg-slate-50 border-pink-200 hover:bg-pink-50 hover:border-pink-300"
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className={`font-bold text-lg text-slate-800 ${isClaimed ? "line-through text-slate-500" : ""}`}>
                                                    {coupon.title}
                                                </div>
                                                <div className={`text-sm text-slate-500 ${isClaimed ? "line-through" : ""}`}>
                                                    {coupon.desc}
                                                </div>
                                            </div>
                                            {isClaimed && (
                                                <div className="bg-green-500 text-white p-1 rounded-full">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                        {isClaimed && (
                                            <div className="absolute inset-0 flex items-center justify-center font-black text-green-600/20 text-4xl rotate-12 select-none pointer-events-none">
                                                CLAIMED
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                        <p className="text-xs text-slate-400 mt-6">Valid forever. Non-transferable. 😉</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [wishMade, setWishMade] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleCakeComplete = () => {
    setWishMade(true);
    confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 } });
  };

  return (
    <main className="min-h-screen font-sans text-slate-800 selection:bg-pink-200 overflow-x-hidden pb-20">
      <Background />
      <MusicPlayer />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 origin-left z-50" style={{ scaleX }} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative pt-20">
        
        {/* Decorative Circle Behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-200/20 to-purple-200/20 rounded-full blur-3xl -z-10" />

        {/* Hero Image with Glow */}
        <motion.div 
          initial={{ scale: 0, rotate: -10 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ type: "spring", duration: 1.5 }}
          className="relative w-56 h-56 md:w-72 md:h-72 mb-10 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-spin-slow blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -inset-2 border-4 border-white/50 rounded-full border-dashed animate-spin-slow" style={{ animationDuration: '10s' }} />
          <img 
            src={CONFIG.heroImage} 
            alt="Birthday Girl" 
            className="w-full h-full object-cover rounded-full border-8 border-white shadow-2xl relative z-10"
          />
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -bottom-6 -right-2 bg-white text-pink-600 px-6 py-2 rounded-full font-bold shadow-xl z-20 rotate-6 border-2 border-pink-100"
          >
            Star Girl! ⭐
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm pb-4 tracking-tight"
        >
          Happy<br/>Birthday!
        </motion.h1>
        
        <div className="flex flex-col items-center gap-2 mb-12">
            <p className="text-2xl md:text-3xl text-slate-600 font-light">
            <span className="font-bold text-slate-800">{CONFIG.name}</span> is officially <span className="text-white bg-pink-500 px-3 py-1 rounded-lg font-bold shadow-lg transform -rotate-2 inline-block mx-1">{CONFIG.age}</span> today!
            </p>
            <div className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-4">You have been being awesome for:</div>
            <LiveAgeTracker />
        </div>

        {/* Cake Section - Always Visible */}
        <div className={`${styles.glass} p-8 rounded-[3rem] w-full max-w-xl mb-8`}>
            <EnhancedCake onComplete={handleCakeComplete} />
        </div>

        {/* Success Message - Only Visible after wishMade */}
        <AnimatePresence>
            {wishMade && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                        <Sparkles className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-800 mb-2">Wishes Sent! 🚀</h2>
                    <p className="text-xl text-slate-600">Your wishes are on their way to the stars.</p>
                </motion.div>
            )}
        </AnimatePresence>
      </section>

      {/* 13 Reasons Carousel */}
      <section className="py-24 px-4 bg-gradient-to-b from-white/0 via-pink-50/50 to-white/0">
        <div className="max-w-6xl mx-auto mb-16 text-center">
          <span className="bg-white border border-purple-200 text-purple-600 px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-6 inline-block shadow-sm">Why We Love You</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-4">13 Reasons You're The Best</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">Swipe to see all the reasons why you are our favorite person!</p>
        </div>
        <ReasonCarousel />
      </section>

      {/* Gift Section (NEW) */}
      <section className="py-20 px-4">
        <GiftBox />
      </section>

      {/* Quiz Section */}
      <section className="py-20 px-4">
        <QuizGame />
      </section>

      {/* Gallery Teaser */}
      <section className="py-20 px-4">
        <motion.div 
          className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl group cursor-pointer"
          whileHover={{ scale: 1.01 }}
          onClick={() => setShowGallery(true)}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500 via-slate-900 to-slate-900" />
          
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 mx-auto mb-8 text-yellow-300 animate-pulse" />
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Memory Lane</h2>
            <p className="text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-light">
                From your first steps to your 13th birthday. Let's take a look back at the cutest moments!
            </p>
            <button className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all flex items-center gap-3 mx-auto">
                <Camera className="w-6 h-6" /> Open Photo Gallery
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 bg-slate-50 border-t border-slate-200">
        <p className="flex items-center justify-center gap-2 font-medium">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> by Your Sibling
        </p>
        <p className="text-sm mt-2 opacity-60">© {new Date().getFullYear()} Harshita's 13th Birthday</p>
      </footer>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl overflow-y-auto">
            <div className="p-4 md:p-8 min-h-screen">
              <div className="flex justify-between items-center mb-8 sticky top-0 z-10 bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                    <Camera className="text-pink-500" /> Harshita's Gallery
                </h2>
                <button onClick={() => setShowGallery(false)} className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto pb-20">
                {CONFIG.galleryImages.map((src, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.1 }}
                    className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <img src={src} alt="Memory" className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-0 left-0 p-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                        <span className="text-white font-bold text-lg">Memory #{i + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}