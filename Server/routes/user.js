import { Router } from "express";
const user = Router();
import { backend } from "../app";

user.get("/",(req,res)=>{
    backend.getCurrentBudget(String(new Date().getFullYear()))
    .then(data => {
        const response = data[0];
      res.send({
        ...response,  
        remAmt: Number(response.remAmt),
        totalAmt: Number(response.totalAmt)
      });
    })
    .catch(err => {
        console.log(err)
      res.status(500).send(err);  
    });
});

export default user;