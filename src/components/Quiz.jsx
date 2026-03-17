import { motion } from 'framer-motion';
import { slideUpVariants, bounceTransition } from '../config/animations';


export default function Quiz({ levelId, showQuiz, setShowQuiz, handlePassLevel, setCurrentIndex }) {
    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
            initial={{ y: "100vh" }}
            // 并恢复点击事件
            animate={{ y: showQuiz ? 0 : "100vh" }}
            transition={bounceTransition}
        >
            <div className={`w-full max-w-4xl bg-gray-800 p-10 border border-gray-600 rounded-2xl shadow-2xl flex flex-col items-center ${showQuiz ? 'pointer-events-auto' : ''}`}>
                <h3 className="text-3xl font-bold mb-8">章末检测</h3>

                <div className="w-full h-64 bg-gray-900 rounded mb-8 flex items-center justify-center border border-gray-700">
                    <span className="text-gray-500">检测题目交互组件区域</span>
                </div>

                <button
                    onClick={handlePassLevel}
                    className="mt-8 px-12 py-3 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white rounded-full border border-gray-600 hover:border-gray-300 tracking-[0.2em] text-sm transition-all duration-300 backdrop-blur-sm"
                >
                    你过关！
                </button>
                <button
                    onClick={() => {
                        setShowQuiz(false);
                        setCurrentIndex(0);
                    }}
                    className="mt-6 text-gray-600 hover:text-gray-300 tracking-widest text-xs transition-colors uppercase"
                >
                    再看看...
                </button>
            </div>
        </motion.div>
    );
}