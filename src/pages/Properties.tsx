import { Nav } from "@/components/user/Account/Dashboard";
import { PropertiesSection } from "@/components/user/Account/Property";

const Properties:React.FC = ()=>{
    return <div className="w-screen h-screen flex  bg-slate-50 p-12">
        <Nav selected="properties" />
        <PropertiesSection />
    </div>
}

export default Properties;