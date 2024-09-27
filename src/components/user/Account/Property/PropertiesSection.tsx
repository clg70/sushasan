import { useUser } from "@/Providers/UserContext";
import PropertyTable from "./Table";

const PropertiesSection: React.FC = () => {
    const {user,isLoading} = useUser()
    if(isLoading) return <div>Loading...</div>;
    console.log(user?.properties);
    return <div className="w-full bg-white rounded-lg p-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Properties</h1>
        <PropertyTable user={user} />
    </div>
}

export default PropertiesSection;