export function abreviarNome(nome) {
  let partesNome = nome.split(" ");
  let iniciais = partesNome
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");
  return iniciais;
}

export function CNPJFormater(cnpj) {
  const CNPJ = cnpj;
  return CNPJ.replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}

export function ToLocaleFormat(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CaptionFormater(text) {
  return text
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
}

export function CPFFormater(cpf) {
  const CPF = cpf;
  return CPF.replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
}
