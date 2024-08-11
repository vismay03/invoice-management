
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        "0": "#2563ebe6",
        "1.0": "#fff"
    },
    shadowBlur: 5
});

export default function RouteLoading() {
    return (
        <TopBarProgress />

    );
}
