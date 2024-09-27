import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import backend from "@/declarations/export";
const schema = z.object({
    regNo: z.string().min(1),
    owner: z.string().min(1),
    valuation: z.string().min(1),
    lat: z.string().min(1),
    lon: z.string().min(1),
    pType: z.string().min(1),
});

const Section:React.FC = ()=>{
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async(data: z.infer<typeof schema>) => {
        try {
            const res = await backend.registerProperty(String(Math.floor(Math.random()*1000000)),data.regNo, data.owner, BigInt(data.valuation), BigInt(data.lat), BigInt(data.lon), data.pType, String(Date.now()));
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return <div className="w-full bg-white rounded-lg">
        <div className="p-4">
            <h1 className="text-2xl font-bold">Register Property</h1>
                <form className="flex flex-col gap-4 mt-4 w-96" onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Registration Number" {...register("regNo")} />
                {errors.regNo && <p className="text-red-500">{errors.regNo.message}</p>}
                <Input placeholder="Owner" {...register("owner")} />
                {errors.owner && <p className="text-red-500">{errors.owner.message}</p>}
                <Input placeholder="Valuation" {...register("valuation")} />
                {errors.valuation && <p className="text-red-500">{errors.valuation.message}</p>}
                <Input placeholder="Latitude" {...register("lat")} />
                <Input placeholder="Longitude" {...register("lon")} />
                {errors.lon && <p className="text-red-500">{errors.lon.message}</p>}
                <Input placeholder="Property Type" {...register("pType")} />
                {errors.pType && <p className="text-red-500">{errors.pType.message}</p>}
                <Button type="submit">Register</Button>
            </form>
        </div>
    </div>
};

export default Section;