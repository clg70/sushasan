import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/declarations/backend/backend.did";
import { useState } from "react";
import backend from "@/declarations/export";
import PropertyTable from "../Property/Table";
const Section: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    
    const [data, setData] = useState<User>({
        id:"",
        nid:"",
        username:"",
        balance:0n,
        czid:"",
        password:"",
        name:"",
        createdAt:"",
        role:"",
        properties:[],
        budgets:[],
        transactions:[],
    });
    const [loading, setLoading] = useState<boolean>(false);
    const handleSearch = async() => {
        setLoading(true);
        try{
            const user = await backend.getUser(search);
            if(user && user[0]){
                setData(user[0]);
                return;
            }
            
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return <div className="w-full bg-white rounded-lg p-12">
        <h1 className="text-2xl font-bold">Tax</h1>
        <div className="flex items-center gap-2 w-96 mt-6">
            <Input placeholder="Search Account" value={search} onChange={(e)=> setSearch(e.target.value)} />
            <Button onClick={handleSearch} disabled={loading}>{loading ? "Loading...":"Search"}</Button>
        </div>
        {data.name && <div className="mt-12">
            <h1 className="text-xl font-bold">Account Details:</h1>
            <div className=" flex gap-12 mt-2 mb-6">
                <div >
                    <p>Name:</p>
                    <p>NID:</p> 
                </div>
                <div>
                    <p>{data.name}</p>
                    <p>{data.nid}</p>
                </div>
            </div>
            <PropertyTable user={data} />
        </div>}
        
    </div>
}

export default Section;