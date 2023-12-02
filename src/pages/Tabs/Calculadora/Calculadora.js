import React, { useState, useEffect, useRef } from "react";
import "./Calculadora.css";
import Mapa from "../../../components/map";
import api from "../../../lib/axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Calculadora = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [dadosEnvio, setDadosEnvio] = useState({
    cep: "",
    distancia: "",
    distanciaCalculada: false,
  });
  const [estado, setEstado] = useState(false);

  const [outrosDados, setOutrosDados] = useState({
    nomeCliente: "",
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    dataEntrega: "",
    valorKm: "",
    valorCompra: "",
  });

  const [cepInput, setCepInput] = useState("");

  useEffect(() => {
    const auth = getAuth();
    document.getElementById("dataAtual").value = obterDataAtual();
    const getJwtToken = async () => {
      try {
        const user = auth.currentUser;
        const idToken = await user.getIdToken();
        setJwtToken(idToken);
      } catch (error) {
        console.error("Erro ao obter o token JWT", error);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        getJwtToken();
      }
    });
  }, []);

  const headers = {
    Authorization: `Bearer ${jwtToken}`,
  };

  const handleInputChange = (e, group) => {
    const { name, value } = e.target;
    if (group === "dadosEnvio") {
      setDadosEnvio((prevDadosEnvio) => ({ ...prevDadosEnvio, [name]: value }));
    } else if (group === "outrosDados") {
      setOutrosDados((prevOutrosDados) => ({
        ...prevOutrosDados,
        [name]: value,
      }));
    }
  };

  const handleCepInputChange = (e) => {
    setCepInput(e.target.value);
  };

  const handleBuscarCEP = async () => {
    try {
      const response = await api.get(
        `https://viacep.com.br/ws/${cepInput}/json/`
      );

      if (response.data.erro) {
        alert("CEP não encontrado");
      } else {
        if (!estado) {
          setEstado(true);
        } else {
          setEstado(false);
        }
        const { logradouro, bairro, localidade, uf } = response.data;
        setDadosEnvio((prevDadosEnvio) => ({
          ...prevDadosEnvio,
          cep: cepInput,
          rua: logradouro,
          numero: outrosDados.numero,
          bairro,
          cidade: localidade,
          estado: uf,
          distanciaCalculada: false,
        }));

        setOutrosDados((prevOutrosDados) => ({
          ...prevOutrosDados,
          rua: logradouro,
          cidade: localidade,
        }));
      }
    } catch (error) {
      alert("Erro ao buscar CEP");
    }
  };

  const handleBuscarCepClick = async () => {
    await handleBuscarCEP();
  };

  const handleEnviarDadosAPI = async () => {
    try {
      // Verificar se todos os campos obrigatórios estão preenchidos
      const camposObrigatorios = [
        "nomeCliente",
        "cep",
        "cidade",
        "numero",
        "dataEntrega",
        "valorKm",
        "distancia",
        "valorCompra",
      ];
      const camposVazios = camposObrigatorios.filter(
        (campo) => !outrosDados[campo] && !dadosEnvio[campo]
      );

      if (camposVazios.length > 0) {
        const camposFaltando = camposVazios
          .map((campo) => {
            switch (campo) {
              case "nomeCliente":
                return "Nome do Cliente";
              case "cep":
                return "CEP";
              case "cidade":
                return "Cidade";
              case "numero":
                return "Número";
              case "dataEntrega":
                return "Data de Entrega";
              case "valorKm":
                return "Valor por KM";
              case "distancia":
                return "Distância";
              case "valorCompra":
                return "Valor da Compra";
              default:
                return campo;
            }
          })
          .join(", ");

        alert(`Por favor, preencha os campos obrigatórios: ${camposFaltando}`);
        return;
      }
      await handleBuscarCEP();

      const distanciaInteira = parseInt(dadosEnvio.distancia);

      console.log("Dados enviados para a API:", {
        ...dadosEnvio,
        distancia: distanciaInteira,
        ...outrosDados,
      });

      const response = await api.post(
        "https://calcularfrete.azurewebsites.net/fretes/calcular",
        { ...dadosEnvio, distancia: distanciaInteira, ...outrosDados },
        { headers }
      );

      console.log("Resposta da API:", response.data);

      if (response.status === 200) {
        setDadosEnvio({
          cep: "",
          distancia: "",
          distanciaCalculada: false,
        });

        setOutrosDados({
          nomeCliente: "",
          rua: "",
          numero: "",
          complemento: "",
          cidade: "",
          estado: "",
          dataEntrega: "",
          valorKm: "",
          valorCompra: "",
        });

        // Limpar os campos de CEP, cidade e endereço adicionando as linhas abaixo
        setCepInput("");
        setDadosEnvio((prevDadosEnvio) => ({
          ...prevDadosEnvio,
          cidade: "",
          rua: "",
        }));
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API", error);
    }
  };


  const handleBlurCepInput = () => {
    // Remover os "-" do CEP
    const cepSemHifen = cepInput.replace(/-/g, "");
    // Atualizar o estado do cepInput
    setCepInput(cepSemHifen);
  };

  function obterDataAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    let mes = hoje.getMonth() + 1;
    let dia = hoje.getDate();

    // Adiciona um zero à esquerda se o mês ou dia for menor que 10
    mes = mes < 10 ? `0${mes}` : mes;
    dia = dia < 10 ? `0${dia}` : dia;

    return `${ano}-${mes}-${dia}`;
  }

  // Preenche o campo de data com a data atual

  return (
    <div className="principal-container">
      <div className="body-container">
        <div className="corpo">
          <div className="input-container">
            <input
              required
              type="text"
              placeholder="Nome do(a) cliente"
              name="nomeCliente"
              value={outrosDados.nomeCliente}
              onChange={(e) => handleInputChange(e, "outrosDados")}
            />
          </div>
          <div className="input-cep">
            <input
              required
              type="text"
              placeholder="CEP"
              name="cep"
              value={cepInput}
              onChange={handleCepInputChange}
              onBlur={handleBlurCepInput}
            />
            <button onClick={handleBuscarCepClick} className="button">
              CEP
            </button>
          </div>
          <div className="input-container">
            <input
              disabled
              type="text"
              placeholder="Cidade"
              name="cidade"
              value={outrosDados.cidade}
              onChange={(e) => handleInputChange(e, "outrosDados")}
            />
          </div>
          <div className="input-container">
            <input
              required
              disabled
              type="text"
              placeholder="Endereço"
              name="rua"
              value={dadosEnvio.rua}
              readOnly
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Número"
              name="numero"
              value={outrosDados.numero}
              onChange={(e) => handleInputChange(e, "outrosDados")}
            />
            <input
              type="text"
              placeholder="Complemento"
              name="complemento"
              value={outrosDados.complemento}
              onChange={(e) => handleInputChange(e, "outrosDados")}
            />
          </div>
          <div className="input-container">
            <input
              id="dataAtual"
              type="date"
              placeholder="Data de Entrega"
              name="dataEntrega"
              value={outrosDados.dataEntrega}
              onChange={(e) => handleInputChange(e, "outrosDados")}
            />
          </div>
          <div className="input-container">
            <input
              required
              type="text"
              placeholder="Valor por KM"
              name="valorKm"
              value={outrosDados.valorKm}
              onChange={(e) => handleInputChange(e, "outrosDados")}
            />
          </div>
          <div className="input-container">
            <input
              disabled
              type="text"
              placeholder="Distância"
              name="distancia"
              value={dadosEnvio.distancia}
              readOnly
            />
          </div>
          <div className="input-container">
            <input
              required
              type="text"
              placeholder="Valor Total da NF"
              name="valorCompra"
              value={outrosDados.valorCompra}
              onChange={(e) => handleInputChange(e, "outrosDados")}
            />
          </div>
          <div className="buttom-calc">
            <button onClick={handleEnviarDadosAPI} className="button">
              Enviar dados
            </button>
          </div>
        </div>
      </div>
      <Mapa
        dadosEnvio={dadosEnvio}
        setDadosEnvio={setDadosEnvio}
        estadoAtual={estado}
      />
    </div>
  );
};

export default Calculadora;
