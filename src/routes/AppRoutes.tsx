import ROUTES from "../shared/constants/routes";
import { Route, Routes } from "react-router-dom";
import Granjas from "../pages/Granjas/Granjas";
import Pesos from "../pages/Pesos/Pesos";
import Home from "../pages/Home/Home";
import Sacrificio from "../pages/Sacrificio/Sacrificio";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.granjas} element={<Granjas />} />
            <Route path={ROUTES.pesos} element = {<Pesos />} />
            <Route path={ROUTES.sacrificio} element = {<Sacrificio />} />

        </Routes>
    )
}