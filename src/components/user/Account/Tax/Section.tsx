import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/declarations/backend/backend.did";
import { useState, useCallback, useEffect } from "react";
import backend from "@/declarations/export";
import PropertyTable from "../Property/Table";
import { Transactions } from "../../Admin";
import { structureTransaction } from "@/utils/structureTransaction";
import { useUser } from "@/Providers/UserContext";
import { io,Socket } from "socket.io-client";
import { toast } from 'react-toastify';
const Section: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const {user,isLoading} = useUser()
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
    const [error, setError] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [socket,setSocket] = useState<Socket | null>(null);

    const connectSocket = useCallback(()=>{
        if(!isLoading){
        const newSocket = io('http://localhost:5000',{
        query:{
            user:user?.id
        }
        });
         // Replace with your server URL
        setSocket(newSocket);
        return () => {
          newSocket.close();
            };
        }
    },[isLoading,user])

    useEffect(() => {
        connectSocket();
    }, [connectSocket]);

    useEffect(() => {
        if(socket){
            socket.emit("id",user?.id);
            socket.on("payment-received",(data)=>{
                toast.success("Payment Accepted");
            })
            socket.on("payment-error",(data)=>{
                toast.error("Payment Error");
            })
            socket.on("payment-declined",(data)=>{
                console.log("payment-declined",data);
                toast.error("Payment Declined");
            });

            socket.on("request-sent",(data)=>{
                toast.success("Payment Request Sent");
            })

            socket.on("request-error",(data)=>{
                toast.error("Payment Request Error");
            })
        } 
      }, [socket]);

    const handleSearch = async() => {
        setLoading(true);
        setError("");
        setData({
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
        try{
            const user = await backend.getUser(search);
            if(user && user[0]){
                setData(user[0]);
                return;
            }
            setError("User not found!");
        }catch(error){
            console.log(error);
            setError("User not found!");
        }finally{
            setLoading(false);
        }
    }

    const structuredTransactions = structureTransaction(data.transactions);
    const handleRequest = async() => {
        setLoading(true);
        setError("");
        try{
            // Implement socket connection request to the payer
            socket?.emit("request-payment",{
                amount,
                user:data.id,
                receiver:`${user?.name} (${user?.id})`,
                purpose:"Tax Payment"
            });
            setLoading(false);
        }catch(error){
            console.log(error);
            setError("User not found!");
        }finally{
            setLoading(false);
        }
    }
    return <div className="w-full bg-white rounded-lg p-12 overflow-x-auto">
        <h1 className="text-2xl font-bold">Tax Billing</h1>
        <p className="text-sm text-gray-500">Search for an account to bill.</p>
        <div className="flex items-center gap-2 w-96 mt-6">
            <Input placeholder="Search Account" value={search} onChange={(e)=> setSearch(e.target.value)} />
            <Button onClick={handleSearch} disabled={loading}>{loading ? "Loading...":"Search"}</Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
            <div className="mt-12 flex flex-col gap-2">
                <h1 className="text-xl font-bold">Properties</h1>
                <p className="text-sm text-gray-500">View the properties for an account.</p>
                <PropertyTable user={data} />
            </div>
            <div className="mt-12 flex flex-col gap-2">
            <h1 className="text-xl font-bold">Billing History</h1>
            <p className="text-sm text-gray-500">View the billing history for an account.</p>
            <Transactions allTransactions={structuredTransactions} />
        </div>
        <div className="mt-12 flex flex-col gap-2">
            <h1 className="text-xl font-bold">Make a Payment</h1>
            <p className="text-sm text-gray-500">Make a payment to the government.</p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex items-center gap-2 w-96 mt-6">
            <Input placeholder="Enter Amount" value={amount} onChange={(e)=> setAmount(Number(e.target.value))} />
            <Button onClick={handleRequest} disabled={loading}>{loading ? "Loading...":"Request"}</Button>
        </div>
        </div>
        </div>}
        
    </div>
}

export default Section;