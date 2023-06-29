/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import rowsBuilder from "./rowsBuilders";
import HeaderBuilder from "./headerBuilder";
import TableBuilder from "./tableBuilder";

export default function TableComponentRetorno({
  headerList,
  data,
  rowList,
  loading,
  nomeCliente,
  cnpjCliente,
  id,
}) {
  const fontTd = "12px";

  const headerIndices = data.reduce((indices, obj, index) => {
    if (obj.isHeader) {
      // Inclui o primeiro objeto com isHeader no primeiro grupo
      indices.push(index);
    }
    return indices;
  }, []);

  headerIndices.push(data.length);

  const groups = headerIndices
    .map((value, index, arr) => {
      if (index !== arr.length - 1) {
        return data.slice(value, arr[index + 1]);
      }
    })
    .filter((item) => item);

  // console.log("headerIndices", headerIndices);
  // console.log("groups", groups);
  const Header_Row = HeaderBuilder(headerList);
  const Rows = rowsBuilder(data, rowList);

  return (
    <TableBuilder
      id={id}
      nomeCliente={nomeCliente}
      cnpjCliente={cnpjCliente}
      Header_Row={Header_Row}
      Rows={Rows}
      titulo={"Retorno do Mês"}
    />
  );
}
