import React, { useState, useEffect, useRef } from "react";
import "./Fretes.css";
import axios from "axios";
import { getJwtToken } from "../../../lib/authUtils";
import FreteModal from "../../../components/FreteModal";

const Fretes = () => {
  const componentRef = useRef();
  const [entregas, setEntregas] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroDataInicial, setFiltroDataInicial] = useState("");
  const [filtroDataFinal, setFiltroDataFinal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = await getJwtToken();
        const response = await axios.get(
          "https://calcularfrete.azurewebsites.net/fretes/listar",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setEntregas(response.data);
      } catch (error) {
        console.error("Erro ao obter dados da API", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(entregas.map((entrega) => entrega.id));
    }
    setSelectAll(!selectAll);
  };

  const handleEditar = () => {
    if (selectedRows.length === 1) {
      const selectedId = selectedRows[0];
      const selectedItem = entregas.find(
        (entrega) => entrega.id === selectedId
      );
      setModalData(selectedItem);
      setModalOpen(true);
    } else {
      console.warn("Selecione apenas um item para editar.");
    }
  };

  const excluirFrete = async (id) => {
    try {
      const jwtToken = await getJwtToken();
      await axios.delete(
        "https://calcularfrete.azurewebsites.net/fretes/deletar",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          data: { id },
        }
      );

      const updatedEntregas = entregas.filter((entrega) => entrega.id !== id);
      setEntregas(updatedEntregas);
      setSelectedRows([]);
    } catch (error) {
      console.error("Erro ao excluir item", error);
    }
  };

  const handleExcluir = () => {
    selectedRows.forEach((id) => {
      excluirFrete(id);
    });
  };

  const atualizarFrete = async (updatedData) => {
    try {
      const jwtToken = await getJwtToken();
      await axios.put(
        "https://calcularfrete.azurewebsites.net/fretes/atualizar",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const updatedEntregas = entregas.map((entrega) =>
        entrega.id === updatedData.id ? updatedData : entrega
      );
      setEntregas(updatedEntregas);
    } catch (error) {
      console.error("Erro ao atualizar frete", error);
    }
  };

  const formatarData = (data) => {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate();
    const mes = dataFormatada.getMonth() + 1;
    const ano = dataFormatada.getFullYear();

    return `${dia}/${mes < 10 ? "0" : ""}${mes}/${ano}`;
  };

  const filtrarLista = () => {
    let listaFiltrada = entregas;

    if (filtroNome) {
      listaFiltrada = listaFiltrada.filter((entrega) =>
        entrega.nomeCliente.toLowerCase().includes(filtroNome.toLowerCase())
      );
    }

    if (filtroDataInicial && filtroDataFinal) {
      const dataInicial = new Date(filtroDataInicial);
      const dataFinal = new Date(filtroDataFinal);

      // Configura a data final para o final do dia
      dataFinal.setDate(dataFinal.getDate() + 2);
      dataFinal.setHours(0, 0, 0, 0);

      listaFiltrada = listaFiltrada.filter((entrega) => {
        const dataEntrega = new Date(entrega.dataEntrega);
        return dataEntrega >= dataInicial && dataEntrega < dataFinal;
      });
    }

    return listaFiltrada;
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="fretes-container">
      <div className="filtro-container">
        <input
          type="text"
          placeholder="FILTRAR POR NOME"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
        />
        <input
          type="date"
          placeholder="DATA INICIAL"
          value={filtroDataInicial}
          onChange={(e) => setFiltroDataInicial(e.target.value)}
        />
        <input
          type="date"
          placeholder="DATA FINAL"
          value={filtroDataFinal}
          onChange={(e) => setFiltroDataFinal(e.target.value)}
        />
        <button onClick={() => filtrarLista()}>Filtrar</button>
        <button onClick={handleImprimir}>Imprimir</button>
      </div>
      <div className="body-container-frete" ref={componentRef}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>CEP</th>
              <th>Rua</th>
              <th>Número</th>
              <th>Data de Entrega</th>
              <th>Valor do Frete</th>
              <th>Valor da Compra</th>
              <th>
                <div className="select-header">
                  <label>Selecionar Itens</label>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtrarLista().map((entrega) => (
              <tr key={entrega.id}>
                <td>{entrega.nomeCliente}</td>
                <td>{entrega.cep}</td>
                <td>{entrega.rua}</td>
                <td>{entrega.numero}</td>
                <td>{formatarData(entrega.dataEntrega)}</td>
                <td>{entrega.valorFrete}</td>
                <td>{entrega.valorCompra}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(entrega.id)}
                    onChange={() => handleCheckboxChange(entrega.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="action-buttons">
        <button onClick={handleEditar} className="edit-button">
          Editar
        </button>
        {modalOpen && (
          <FreteModal
            data={modalData}
            onClose={() => setModalOpen(false)}
            onUpdate={atualizarFrete}
          />
        )}
        <button onClick={handleExcluir} className="delete-button">
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Fretes;
