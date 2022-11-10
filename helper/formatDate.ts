export const formatDateFromDatabase = (date: string) => {
  const dateLiteral: {
    [x: number]: string;
  } = {
    0: "Janeiro",
    1: "Fevereiro",
    2: "Março",
    3: "Abril",
    4: "Maio",
    5: "Junho",
    6: "Julho",
    7: "Agosto",
    8: "Setembro",
    9: "Outubro",
    10: "Novembro",
    11: "Dezembro",
  };

  const _date = new Date(date);

  const formatedDate = `${
    _date.getDate() < 10 ? "0" + _date.getDate().toString() : _date.getDate()
  } de ${dateLiteral[_date.getMonth()]} ${_date.getFullYear()}`;

  return formatedDate;
};
