import {motion} from "framer-motion";

export const variants = {
    initial: {
        transition: {
            staggerChildren: 0.1
        }
    },
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const dotVariants = {
    initial: {
        y: -5
    }, animate: {
        y: 5
    }
}

export default function LoadingAnimation() {
    return (
        <motion.div className='px-2' initial='initial' animate='animate' variants={variants}
                    style={{display: 'flex', columnGap: '4px'}}>
            <motion.span variants={dotVariants}
                         transition={{ease: 'easeInOut', duration: 0.5, repeatType: 'reverse', repeat: Infinity}}
                         style={{width: '10px', height: '10px', background: '#222222', borderRadius: '50%'}}/>
            <motion.span variants={dotVariants}
                         transition={{ease: 'easeInOut', duration: 0.5, repeatType: 'reverse', repeat: Infinity}}
                         style={{width: '10px', height: '10px', background: '#222222', borderRadius: '50%'}}/>
            <motion.span variants={dotVariants}
                         transition={{ease: 'easeInOut', duration: 0.5, repeatType: 'reverse', repeat: Infinity}}
                         style={{width: '10px', height: '10px', background: '#222222', borderRadius: '50%'}}/>
        </motion.div>
    );
}