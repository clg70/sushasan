import { Nav } from "@/components/user/Account/Dashboard";
import { Section } from "@/components/user/Account/Tax";

const TaxBilling = () => {
    return <div className="w-screen h-screen flex bg-primary p-12">
        <Nav selected="taxes" />
        <Section /> 
    </div>
}

export default TaxBilling;