import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI(process.env.GOOGLE_AI_KEY);

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
return response.text;
}

// await main();
export default main;

// import { GoogleGeneAI } from "@google/genai";

// const genAI = new GoogleGeneAI(process.env.GOOGLE_AI_KEY);

// async function generateResult(prompt) {
//   // get the model
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   // generate response
//   const result = await model.generateContent(prompt);

//   // return plain text
//   return result.response.text();
// }

// export default generateResult;



// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI(process.env.GOOGLE_AI_KEY);

// async function generateResult(prompt) {
//   const response = await genAI.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });
//   return response.text;
// }

// export default generateResult;

// import { GoogleGenAI } from "@google/genai";

// const genAI = new GoogleGenAI(process.env.GOOGLE_AI_KEY);
// const model=genAI.getGen
// export const generateResult=async(prompt)=>{
//   const prompt="Explain how AI works in a few words";
//   const result=await model.generateContent(prompt)
//   return result.response.text();
  
  
// }

