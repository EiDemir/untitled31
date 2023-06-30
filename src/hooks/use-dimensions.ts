import {useEffect, useRef} from "react";

// @ts-ignore
export const useDimensions = ref => {
    const dimensions = useRef({width: 0, height: 0});

    useEffect(() => {
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.offsetHeight;
    }, [ref]);

    return dimensions.current;
};