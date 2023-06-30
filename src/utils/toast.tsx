import toast from "react-hot-toast";
import {motion} from "framer-motion";
import {CheckIcon, ExclamationTriangleIcon} from "@heroicons/react/24/solid";

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

export function toastStart(message: string) {
    return toast.custom(() =>
        <motion.div
            whileHover={{scale: 1.1}}
            initial={{scale: 0, opacity: 0, y: 100}}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1
            }}
            style={{width: '250px', backgroundColor: 'rgb(37 99 235 / 0.8)'}}
            className='toast'>
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
            {message}
        </motion.div>, {
        duration: Infinity
    });
}

export function toastEnd(message: string, ts: string, error = false) {
    return toast.custom((t) =>
        <motion.div
            initial={false}
            animate={{
                opacity: t.visible ? 1 : 0,
                y: t.visible ? 0 : 100,
                scale: t.visible ? 1 : 0
            }}
            transition={{
                duration: 0.3,
                ease: 'easeOut'
            }}
            style={{width: '250px', backgroundColor: `rgb(${error ? '220 38 38' : '22 163 74'} / 0.8)`}}
            className='toast'>
            {error ? <ExclamationTriangleIcon className='w-6 h-auto'/> : <CheckIcon className='w-6 h-auto'/>}
            {message}
        </motion.div>, {
        duration: 2000,
        id: ts
    });
}