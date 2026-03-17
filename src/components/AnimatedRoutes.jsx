import { Routes, Route, useLocation, Navigate } from 'react-router';
import { AnimatePresence } from 'framer-motion';

import MainMenu from '../Levels/MainMenu';
import LevelOne from '../Levels/LevelOne';
import LevelTwo from '../Levels/LevelTwo';

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Navigate to="/level/0" replace />} />
                    <Route path="/level/0" element={<MainMenu />} />
                    <Route path="/level/1" element={<LevelOne />} />
                    <Route path="/level/2" element={<LevelTwo />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
}
