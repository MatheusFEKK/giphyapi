let searchTerm = "";
let offset = 0;

function buscarGIFs(novaBusca = false) {
    if (novaBusca) {
        searchTerm = document.getElementById("search").value;
        offset = 0; // Reinicia o offset para uma nova busca
        document.getElementById("resultado").innerHTML = "<p>Carregando...</p>";
    }

    fetch(`api.php?q=${searchTerm}&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            if (novaBusca) {
                document.getElementById("resultado").innerHTML = ""; // Limpa resultados anteriores
            }

            data.data.forEach(gif => {
                const gifDiv = document.createElement("div");
                gifDiv.classList.add("gif-container");

                gifDiv.innerHTML = `
                    <img src="${gif.images.fixed_height.url}" alt="GIF">
                `;

                document.getElementById("resultado").appendChild(gifDiv);
            });

            offset += 10; // Atualiza o offset para carregar mais na próxima requisição

            // Se houver mais GIFs, exibe o botão "Carregar Mais"
            if (data.data.length > 0) {
                document.getElementById("carregarMais").style.display = "block";
            } else {
                document.getElementById("carregarMais").style.display = "none";
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            document.getElementById("resultado").innerHTML = "<p>Erro ao buscar GIFs. Tente novamente.</p>";
        });
}

function carregarMais() {
    buscarGIFs(false); // Carrega mais GIFs sem reiniciar a busca
}