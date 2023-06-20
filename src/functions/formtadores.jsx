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
