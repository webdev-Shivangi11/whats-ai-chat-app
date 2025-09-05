// import * as ai from "../services/genAiServices.js"
import main from "../services/genAiServices.js"


export  const getResult=async(req,res)=>{
    try{
        const {prompt}=req.query
        // const result=await ai.generateResult(prompt);
        const result=await main(prompt);
        res.send (result);
    }catch(error){
        res.status(500).send({message:error.message})
    }
    

}