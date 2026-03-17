import { BrowserRouter } from 'react-router';
import AnimatedRoutes from './components/AnimatedRoutes';
import { GameProvider } from './context/GameContext';

export default function App() {
    return (
        <GameProvider>
            <BrowserRouter>
                <AnimatedRoutes />
            </BrowserRouter>
        </GameProvider>
    );
}