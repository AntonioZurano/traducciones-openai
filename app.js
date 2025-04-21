// Importar dependencias
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";



//cargar configuracion (de api key)
dotenv.config();

//Cargar express
const app = express();
const PORT = process.env.PORT || 3005;


//Servir frontend
app.use("/", express.static("public"));

//Middleware para procesar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Instancia de openai y pasar el api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//Ruta / endpoint /url
app.post('/api/traducir', async (req, res) => {

    const { text, targetLang} = req.body;

    const promptSystem1 = "Eres un traductor profesional. ";
    const promptSystem2 = "Sólo puedes responder con una traducción directa del texto que el usuario te envie"
                          +"Cualquier otra respuesta o conversación está prohibida. ";
    const promptUser = `Traduce el siguiente texto de español al ${targetLang}: ${text}`;
    //console.log("Texto a traducir:", text);
    //console.log("Idioma de destino:", targetLang);

     //Funcionalidad de traducir con IA
     //Llamar al LLM o modelo de openai

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: promptSystem1 },
                { role: "system", content: promptSystem2 },
                { role: "user", content: promptUser }
            ],
            max_tokens: 500
        });
        
        const translatedText = completion.choices[0].message.content;

        return res.status(200).json({ translatedText });
        // Send the completion result back to the client
        

     } catch (error) {
        console.log("Error during translation:", error);
        res.status(500).json({ error: "Error al traducir" });
     }
    });


//Servir el backend
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });