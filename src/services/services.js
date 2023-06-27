import api from "./api";

export default class ServicesApi {
  static getJsonByTipo = async (ano, idCliente, tipo, mes) => {
    const response = await api.get(
      `/NovoBonitao/download?ano=${ano}&idCliente=${idCliente}&tipo=${tipo}&mes=${mes}`
    );
    return response.data;
  };

  static solicitarRelatorio = async (data, idCliente, idSignal, secret) => {
    const response = await api.get(
      `/exportacao/nova?data=${data}&idCliente=${idCliente}&idSignal=${idSignal}&secret=${secret}`
    );
    return response.data;
  };
}
