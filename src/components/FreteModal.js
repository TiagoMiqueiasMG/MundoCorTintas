import React, { useState, useEffect } from "react";
import "./FreteModal.css";

const FreteModal = ({ data, onClose, onUpdate }) => {
  const [cliente, setCliente] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [valorKM, setValorKM] = useState("");
  const [distancia, setDistancia] = useState("");
  const [valorNotaFiscal, setValorNotaFiscal] = useState("");

  useEffect(() => {
    if (data) {
      setCliente(data.nomeCliente || "");
      setCep(data.cep || "");
      setEndereco(data.rua || "");
      setNumero(data.numero || "");
      setDataEntrega(data.dataEntrega || "");
      setValorKM(data.valorFrete || "");
      setDistancia(data.distancia || "");
      setValorNotaFiscal(data.valorCompra || "");
    }
  }, [data]);

  const handleSalvar = () => {
    const updatedData = {
      ...data,
      nomeCliente: cliente,
      cep: cep,
      rua: endereco,
      numero: numero,
      dataEntrega: dataEntrega,
      valorFrete: valorKM,
      distancia: distancia,
      valorCompra: valorNotaFiscal,
    };

    onUpdate(updatedData);
    onClose();
  };

  const handleDescartar = () => {
    onClose();
  };

  return (
    <div className="modal-principal">
      <div className="modal-content-principal">
        <p>Frete Calculado</p>
        <div className="input-container-principal">
          <label>
            Nome do Cliente:
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Digite o nome do cliente"
            />
          </label>
        </div>
        <div className="input-container-principal">
          <label>
            CEP:
            <input
              type="text"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Digite o CEP"
            />
          </label>
        </div>
        <div className="input-container-principal">
          <label>
            Endereço:
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Digite o endereço"
            />
          </label>
        </div>
        <div className="input-container-principal">
          <label>
            Número:
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Digite o número"
            />
          </label>
        </div>
        <div className="input-container-principal">
          <label>
            Data da Entrega:
            <input
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
          </label>
        </div>
        <div className="input-container-principal">
          <label>
            Valor KM:
            <input
              type="text"
              value={valorKM}
              onChange={(e) => setValorKM(e.target.value)}
              placeholder="Digite o valor do KM"
            />
          </label>
        </div>
        <div className="input-container-principal">
          <label>
            Distância:
            <input
              type="text"
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              placeholder="Digite a distância"
            />
          </label>
        </div>
        <div className="input-container-principal">
          <label>
            Valor da Nota Fiscal:
            <input
              type="text"
              value={valorNotaFiscal}
              onChange={(e) => setValorNotaFiscal(e.target.value)}
              placeholder="Digite o valor da nota fiscal"
            />
          </label>
        </div>
        <div className="button-container-principal">
          <button onClick={handleSalvar}>Salvar</button>
          <button onClick={handleDescartar}>Descartar</button>
        </div>
      </div>
    </div>
  );
};

export default FreteModal;
