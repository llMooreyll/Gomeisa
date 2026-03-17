import { useNavigate } from 'react-router';
import { useGame } from '../context/GameContext';
import { levels } from '../config/levelNames';

export default function LevelHeader({ levelId }) {

    const { unlockedLevel } = useGame();
    const navigate = useNavigate();

    const currentLevelData = levels.find(level => level.id === levelId);
    const totalLevels = levels.length;

    const handlePrevLevel = () => {
        navigate(`/level/${levelId - 1}`);
    };

    const handleHome = () => {
        navigate('/level/0');
    };

    return (
        // 使用 absolute 固定在顶部，pointer-events-none 确保它不会遮挡下方游戏画面的点击操作
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-8 z-50 pointer-events-none">

            <div className="flex items-center space-x-3">
                <button
                    onClick={handleHome}
                    className="pointer-events-auto flex items-center space-x-1 text-xs tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 text-gray-300 bg-white/10 hover:bg-white/20 hover:text-white transition-all duration-200 cursor-pointer"
                    title="返回主页"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>主页</span>
                </button>

                <button
                    onClick={handlePrevLevel}
                    className={`pointer-events-auto flex items-center space-x-1 text-xs tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm border transition-all duration-200 text-gray-300 bg-white/10 border-white/10 hover:bg-white/20 hover:text-white cursor-pointer`}
                    title="上一关"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>上一关</span>
                </button>


                <div className="text-gray-300 tracking-widest font-light text-sm drop-shadow-md ml-2">
                    <span className="text-gray-500 mr-2">LEVEL {levelId}</span>
                    {currentLevelData?.title || '未知关卡'}
                </div>
            </div>

            {/* 进度 */}
            <div className="flex items-center space-x-3 drop-shadow-md">
                <span className="text-xs text-gray-500 uppercase tracking-widest">
                    Progress
                </span>
                <span className="text-gray-200 font-mono text-sm bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
                    {unlockedLevel} / {totalLevels}
                </span>
            </div>

        </div>
    );
}