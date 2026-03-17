import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { slideUpVariants, bounceTransition } from '../config/animations';
import { useGame } from '../context/GameContext';
import { useState } from 'react';
import LevelHeader from '../components/LevelHeader';
import Vedio from '../components/Vedio';
import Quiz from '../components/Quiz';
import ChatBot from '../components/Chatbot';


export default function LevelOne() {
    //轮播组件动画计数器
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = 3;
    const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
    const handleNext = () => setCurrentIndex((prev) => Math.min(totalSlides - 1, prev + 1));

    const [showQuiz, setShowQuiz] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const navigate = useNavigate();
    const { unlockNext } = useGame();

    const handlePassLevel = () => {
        unlockNext(1);
        navigate('/level/2');
    };

    return (
        //页面移入移出动画
        <motion.div
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={bounceTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white overflow-hidden"
        >
            <LevelHeader levelId={2} />

            <motion.div
                className="flex w-full gap-4 px-6 relative z-10 mt-20 h-[calc(100vh-120px)]"
                animate={{
                    y: showQuiz ? "-100vh" : 0,
                    opacity: showQuiz ? 0 : 1
                }}
                transition={bounceTransition}
            >
                <Vedio
                    levelId={1}
                    showQuiz={showQuiz}
                    setShowQuiz={setShowQuiz}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    totalSlides={totalSlides}
                    currentIndex={currentIndex} />
                <ChatBot />
            </motion.div>

            {/* 章末检测 */}
            <Quiz
                levelId={1}
                showQuiz={showQuiz}
                setShowQuiz={setShowQuiz}
                handlePassLevel={handlePassLevel}
                setCurrentIndex={setCurrentIndex} />

        </motion.div>
    );
}