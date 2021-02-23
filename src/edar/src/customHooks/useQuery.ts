import { useLocation } from 'react-router-dom';

// URLクエリパラメータの取得
export default function useQuery() {
    return new URLSearchParams(useLocation().search);
}
