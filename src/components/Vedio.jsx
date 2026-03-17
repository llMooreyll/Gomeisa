import { motion } from 'framer-motion';
import { bounceTransition } from '../config/animations';


export default function Vedio({ levelId, showQuiz, setShowQuiz, handlePrev, handleNext, totalSlides, currentIndex }) {
    return (
        // 左侧：轮播区域 (60%)
        <div className="flex-1 h-full">
            <div className="flex flex-col flex-[3] min-w-0 gap-4 h-full">
                {/* 轮播容器 */}
                <div className="relative flex-1 bg-black border border-gray-700 shadow-2xl rounded-xl overflow-hidden h-full">
                    <motion.div
                        className="flex w-full h-full"
                        animate={{ x: `-${currentIndex * 100}%` }}
                        transition={bounceTransition}
                    >
                        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-neutral-900">
                            <span className="text-gray-500 text-2xl tracking-widest">Video Player COMPONENT</span>
                        </div>
                        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-zinc-800">
                            <span className="text-gray-400 text-2xl tracking-widest">PDF Viewer COMPONENT</span>
                        </div>
                        <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-stone-900">
                            <span className="text-gray-500 text-2xl tracking-widest">Visualize COMPONENT</span>
                        </div>
                    </motion.div>

                    {currentIndex > 0 && (
                        <button
                            onClick={handlePrev}
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-white/10 text-gray-500 hover:text-white rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-gray-400 z-20 font-light text-xl"
                        >
                            &#8592;
                        </button>
                    )}

                    {currentIndex < totalSlides - 1 && (
                        <button
                            onClick={handleNext}
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-white/10 text-gray-500 hover:text-white rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-gray-400 z-20 font-light text-xl"
                        >
                            &#8594;
                        </button>
                    )}

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {Array.from({ length: totalSlides }).map((_, i) => (
                            <span
                                key={i}
                                className={`block rounded-full transition-all duration-300
                                    ${i === currentIndex ? 'w-5 h-1.5 bg-white/70' : 'w-1.5 h-1.5 bg-white/25'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* 章末检测按钮 */}
                <div className="flex items-center justify-center h-14 flex-shrink-0">
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: currentIndex === totalSlides - 1 ? 1 : 0,
                            y: currentIndex === totalSlides - 1 ? 0 : 10,
                            pointerEvents: currentIndex === totalSlides - 1 ? "auto" : "none"
                        }}
                        transition={bounceTransition}
                        whileHover={{
                            scale: 1.05,
                            borderColor: "rgba(255, 255, 255, 0.6)",
                            backgroundColor: "rgba(255, 255, 255, 0.05)"
                        }}
                        onClick={() => setShowQuiz(true)}
                        className="px-12 py-3 border border-white/20 text-gray-400 hover:text-white rounded-full tracking-[0.3em] text-xs backdrop-blur-sm uppercase"
                    >
                        章末检测
                    </motion.button>
                </div>
            </div>

            {/* ── 右侧：AI 对话面板 (40%) ── */}
            {/* <div className="flex-[2] min-w-0 pb-14">
                <AiChat levelId={levelId} />
            </div> */}
        </div>
    );
}