import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { slideUpVariants, bounceTransition } from '../config/animations';
import { levels } from '../config/levelNames';


export default function MainMenu() {

    return (
        <motion.div
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={bounceTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white"
        >
            <h1 className="text-4xl font-bold mb-40 tracking-widest text-gray-200">
                Gomeisa
            </h1>

            <div className="relative w-4/5 max-w-4xl flex items-center justify-between mt-10">

                <div className="absolute left-0 right-0 h-[2px] bg-gray-800 z-0 top-1/2 transform -translate-y-1/2" />

                {levels.map((level, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div key={level.id} className="relative flex flex-col items-center z-10">

                            {isEven && (
                                <div className="absolute bottom-full mb-6 text-sm text-gray-400 whitespace-nowrap">
                                    {level.title}
                                </div>
                            )}

                            <Link
                                to={`/level/${level.id}`}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-black border-2 border-gray-700 text-gray-500 hover:text-white hover:border-blue-500 hover:scale-110 transition-all duration-300"
                            >
                                {level.id}
                            </Link>

                            {!isEven && (
                                <div className="absolute top-full mt-6 text-sm text-gray-400 whitespace-nowrap">
                                    {level.title}
                                </div>
                            )}
                        </div>
                    );
                })}

            </div>
        </motion.div>
    );
}