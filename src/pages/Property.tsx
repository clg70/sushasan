import { Nav } from "@/components/user/Account/Dashboard"
import { Section } from "@/components/user/Account/Property"

const Property:React.FC = ()=>{
    return <div className="w-screen h-screen flex  bg-slate-50 p-12">
    <Nav selected="budget" />
    <Section />
    </div>
};

export default Property;