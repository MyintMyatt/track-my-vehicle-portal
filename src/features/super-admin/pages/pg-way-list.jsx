import { Plus } from "lucide-react";
import { AppAddNewButton } from "../../../components/comp-app-button";
import { AppLargeTitle } from "../../../components/comp-app-titles";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/app-fe-route-endpoints";


const WayList = () => {
    const navigate = useNavigate();
    
    return (
        <div>
           <div className="flex justify-between">
                <AppLargeTitle text={'Way Management'}/>
                <AppAddNewButton 
                    text={'Create New Car Way'}
                    icon={<Plus/>}
                    onClick={() => navigate(ROUTE_PATHS.WAY.new)}
                />
           </div>
        </div>
    );
}

export default WayList;