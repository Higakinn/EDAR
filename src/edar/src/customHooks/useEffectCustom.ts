import { useEffect, useRef } from "react";

// 初回レンダリング時に実行されないカスタムフック
function useEffectCustom(func: React.EffectCallback, dependencyList?: React.DependencyList) {
    const fisrtFlgRef = useRef(true);

    useEffect(() => {
        if (!fisrtFlgRef.current) {
            func();
        } else {
            fisrtFlgRef.current = false;
        }
        // TODO: (警告が出る)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyList);
};

export default useEffectCustom;
