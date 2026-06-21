import AddPage from "../pages/Add page";
import Basket from "../pages/Basket";
import DetailPage from "../pages/Detail page";
import Favorites from "../pages/Favorites";
import HomePage from "../pages/Home";
import NotFound from "../pages/Not Found";
import UserLayout from "../pages/UserLayout";

const ROUtes = [
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "/add",
                element: <AddPage />,
            },
            {
                path: "/favorites",
                element: <Favorites />,
            },
            {
                path: "/detail/:id",
                element: <DetailPage />,
            },
            {
                path: "/*",
                element: <NotFound />,
            },
            {
                path: "/basket",
                element: <Basket />,
            }
        ]
    }
]

export default ROUtes