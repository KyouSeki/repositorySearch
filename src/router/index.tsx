import { createBrowserRouter, RouteObject } from "react-router-dom";
import KeepAlive from "react-activation"
import SerachList from "@/pages/SerachList";
import SearchRepositories from "@/pages/SerachList/SearchRepositories";
import IssuesList from "@/pages/SerachList/IssuesList";

// KeepAliveを用いて、検索リストのページをキャッシュする
const router = createBrowserRouter([
  {
    path: "/",
    element: <SerachList />,
    children:[
      {
        index: true,
        element: <KeepAlive id="SearchRepositories" ><SearchRepositories /></KeepAlive>,
      },
      {
        path: "issues/:id",
        element: <IssuesList />,
      }
    ]
  }] as RouteObject []
);

export default router;
