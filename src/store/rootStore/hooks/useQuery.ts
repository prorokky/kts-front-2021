import {useLocation} from "react-router-dom";
import RootStore from "@store/rootStore/RootStore";

export const useQuery = (): void => {
    const {search} = useLocation()
    const rootStore = new RootStore()

    rootStore.query.setSearch(search);
}