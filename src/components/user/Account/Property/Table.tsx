import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Property, User } from "@/declarations/backend/backend.did";
const PropertyTable:React.FC<{
  user?: User
}> = ({user})=>{

    const structuredProperties = ()=>{
        const properties: Property[] = [];
        user?.properties.map((property: [string, Property])=>{
            properties.push(property[1])
        })

        return properties;
    };

    const properties = structuredProperties();
   
    return <Table>
    <TableCaption>A list of your registered properties.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px] relative right-2">Registeration Number</TableHead>
        <TableHead  >Property Type</TableHead>
        <TableHead>Landmark</TableHead>
        <TableHead className="text-right">Value</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {properties.map((property)=>(
      <TableRow>
        <TableCell className="font-medium relative right-2">{property.regNo}</TableCell>
        <TableCell>{property.propertyType}</TableCell>
        <TableCell>{property.lat+","+property.lon}</TableCell>
        <TableCell className="text-right">Rs. {property.valuation.toString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  
}

export default PropertyTable;