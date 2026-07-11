import ROUTES from "../shared/constants/routes";
import { Route, Routes } from "react-router-dom";
import Granjas from "../pages/Granjas/Granjas";
import Pesos from "../pages/Pesos/Pesos";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path={ROUTES.granjas} element={<Granjas />} />
            <Route path={ROUTES.pesos} element = {<Pesos />} />
        </Routes>
    )
}