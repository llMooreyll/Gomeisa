import { createContext, useContext, useState, useEffect } from 'react';

// 1. 创建 Context 对象
const GameContext = createContext();

// 2. 创建一个 Provider 组件，用来包裹整个应用
export function GameProvider({ children }) {
    // 状态：最高解锁关卡。初始化时优先读取 localStorage，如果没有则默认为 1
    const [unlockedLevel, setUnlockedLevel] = useState(() => {
        // const savedLevel = localStorage.getItem('unlockedLevel');
        const savedLevel = null;
        return savedLevel ? parseInt(savedLevel, 10) : 1;
    });

    // 当 unlockedLevel 发生变化时，自动将其保存到 localStorage
    // useEffect(() => {
    //     localStorage.setItem('unlockedLevel', unlockedLevel.toString());
    // }, [unlockedLevel]);

    // 供关卡调用的过关函数：只在当前关卡达到最高记录时才加 1
    const unlockNext = (currentLevel) => {
        if (currentLevel >= unlockedLevel) {
            setUnlockedLevel(currentLevel + 1);
        }
    };

    return (
        <GameContext.Provider value={{ unlockedLevel, unlockNext }}>
            {children}
        </GameContext.Provider>
    );
}

// 3. 导出一个快捷使用的 Hook
export const useGame = () => useContext(GameContext);