import React, { useEffect, useRef, useState } from "react";
import "./map.css";


const Mapa = ({ dadosEnvio, setDadosEnvio, estadoAtual }) => {
  let map, directionsService, directionsRenderer;
  const [scriptAPI, setScriptAPI] = useState(false);
  const [contador, setContador] = useState(10);
  const [start, setStart] = useState("Av Dionísio Gomes n 67, bairro Veneza - Ribeirão das Neves, MG");
  const [end, setEnd] = useState("Av Dionísio Gomes n 67, bairro Veneza - Ribeirão das Neves, MG");

  //verificase o script da api do google maps ja foi carregado, caso não tenha sido, adiciona ele ao html 
  useEffect(() => {
    if (scriptAPI === false) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDGHMmoPL2pV5s0f723u2p9v5N2aKeIiHY&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
      setScriptAPI(true);
    }
  }, [scriptAPI]);

  //monitora para verificar se o botão cep foi clicado, para que seja executada a função de mostrar rota
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) {
      setEnd(`${dadosEnvio.rua}, ${dadosEnvio.numero}, ${dadosEnvio.bairro}, ${dadosEnvio.cidade}, ${dadosEnvio.estado}`)
      setContador(contador + 1);
    } else {
      mounted.current = true;
    }
  }, [estadoAtual]);

  useEffect(()=>{
    dispararEventoIncremento();
  },[end]);

  //função de inicialização do mapa
  function initMap() {
    directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer();
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -19.7621, lng: -44.0844 },
      zoom: 10,
    })
    directionsRenderer.setMap(map);

    const executarCalculo = () => {
      calcularDistanciaEMostrarRota(directionsService, directionsRenderer);
    }

    document.getElementById('inputCounter').addEventListener("valorIncrementado", executarCalculo);
  }


  // Cria um evento personalizado 'valorIncrementado' e dispara-o
  const dispararEventoIncremento = () => {
    const inputElement = document.getElementById('inputCounter');
    const evento = new Event('valorIncrementado');
    inputElement.dispatchEvent(evento);
  };



  function calcularDistanciaEMostrarRota(directionsService, directionsRenderer) {
    directionsService
      .route({
        origin: {
          query: document.getElementById("start").value,
        },
        destination: {
          query: document.getElementById("end").value,
        },
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        const distancia = response.routes[0].legs[0].distance.text;
        setDadosEnvio((prevDadosEnvio) => ({
          ...prevDadosEnvio,
          distancia: distancia,
          distanciaCalculada: true,
        }))
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to "));
  }


  return (
    <div className="map-container">
      <input id="inputCounter" type="text" value={contador} style={{ display: 'none' }} disabled />
      <input id="start" type="text" value={start} style={{ display: 'none' }} disabled />
      <input id="end" type="text" value={end} style={{ display: 'none' }} disabled />
      <div id="map"></div>
    </div>
  );

};




export default Mapa;





