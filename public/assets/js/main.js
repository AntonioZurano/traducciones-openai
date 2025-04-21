let translateButton = document.querySelector("#translateButton");

translateButton.addEventListener("click", async() => {
  
    // Valor a traducir
    const text = document.querySelector("#inputText").value.trim();
    //Lenguaje de destino
    const targetLang = document.querySelector("#targetLang").value;

    if (!text) return false;

    //Meter el mensaje del usuario a la caja de mensajes
    const userMessage = document.createElement("div");
    userMessage.className = "chat__message chat__message--user";
    userMessage.textContent = text;

    const messagesContainer = document.querySelector(".chat__messages");
    messagesContainer.appendChild(userMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    //Peticon ajax al backend
    try {
        const response = await fetch("/api/traducir", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                text, 
                targetLang 
            })
        });

        const data = await response.json();

        

        const transl = data.translatedText;

        //Agregar el mensaje de la IA al chat
        const botMessage = document.createElement("div");
        botMessage.className = "chat__message chat__message--bot";
        botMessage.textContent = data.translatedText;

        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        //Limpiar el input de texto
        document.querySelector("#inputText").value = "";
                
    }catch (error) {
        console.log("Error al traducir:", error);
        return false;
    }

})